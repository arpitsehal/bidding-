const items = [
  {
    id: 1,
    title: 'Vintage Camera',
    startingPrice: 100,
    currentBid: 100,
    endTime: Date.now() + 600000, // 10 minutes from now
    bidHistory: [],
  },
  {
    id: 2,
    title: 'Rare Coin',
    startingPrice: 50,
    currentBid: 50,
    endTime: Date.now() + 1200000, // 20 minutes from now
    bidHistory: [],
  },
  {
    id: 3,
    title: 'Signed Poster',
    startingPrice: 200,
    currentBid: 200,
    endTime: Date.now() + 900000, // 15 minutes from now
    bidHistory: [],
  },
];

module.exports = { items };
