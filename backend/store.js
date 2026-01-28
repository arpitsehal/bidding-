const items = [
  {
    id: 1,
    title: 'Vintage Camera',
    startingPrice: 100,
    currentBid: 100,
    endTime: Date.now() + 600000, // 10 minutes from now
    duration: 600000,
    bidHistory: [],
    restartAt: null,
  },
  {
    id: 2,
    title: 'Rare Coin',
    startingPrice: 50,
    currentBid: 50,
    endTime: Date.now() + 1200000, // 20 minutes from now
    duration: 1200000,
    bidHistory: [],
    restartAt: null,
  },
  {
    id: 3,
    title: 'Signed Poster',
    startingPrice: 200,
    currentBid: 200,
    endTime: Date.now() + 900000, // 15 minutes from now
    duration: 900000,
    bidHistory: [],
    restartAt: null,
  },
];

module.exports = { items };
