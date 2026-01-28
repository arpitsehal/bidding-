import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const useSocket = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [socketId, setSocketId] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to server', socket.id);
            setSocketId(socket.id);
        });

        socket.on('INIT_ITEMS', (initialItems) => {
            setItems(initialItems);
        });

        socket.on('UPDATE_BID', ({ itemId, currentBid, bidder }) => {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === itemId
                        ? { ...item, currentBid, lastBidder: bidder, lastBidTime: Date.now() }
                        : item
                )
            );
        });

        socket.on('BID_ERROR', ({ message }) => {
            setError(message);
            setTimeout(() => setError(null), 3000); // Clear error after 3s
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const placeBid = (itemId, amount) => {
        if (socketRef.current) {
            socketRef.current.emit('BID_PLACED', { itemId, bidAmount: amount });
        }
    };

    return { items, placeBid, error, socketId };
};
