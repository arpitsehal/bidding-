const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { items } = require('./store');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for this assessment
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());


// Basic route for health check
app.get('/', (req, res) => {
    res.send('Live Bidding Backend is Running!');
});

// REST API
app.get('/items', (req, res) => {
    res.json(items);
});

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.emit('INIT_ITEMS', items);

    socket.on('BID_PLACED', ({ itemId, bidAmount }) => {
        const item = items.find(i => i.id === itemId);

        if (!item) {
            return socket.emit('BID_ERROR', { message: 'Item not found' });
        }

        if (Date.now() > item.endTime) {
            return socket.emit('BID_ERROR', { message: 'Auction ended' });
        }

        // Race condition handling:
        // Simple check: strictly greater than current bid
        if (bidAmount <= item.currentBid) {
            return socket.emit('BID_ERROR', { message: 'Outbid! Bid must be higher.' });
        }

        // Update state
        item.currentBid = bidAmount;
        item.bidHistory.push({ bidder: socket.id, amount: bidAmount, timestamp: Date.now() });

        // Broadcast new bid to ALL clients
        io.emit('UPDATE_BID', { itemId, currentBid: bidAmount, bidder: socket.id });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
