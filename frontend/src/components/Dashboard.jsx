import React from 'react';
import ItemCard from './ItemCard';

const Dashboard = ({ items, placeBid, socketId }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
                Live Bidding Auction
            </h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">Loading items...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            placeBid={placeBid}
                            socketId={socketId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
