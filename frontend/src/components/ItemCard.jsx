import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const ItemCard = ({ item, placeBid, socketId }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isEnded, setIsEnded] = useState(false);
    const [flash, setFlash] = useState('');

    // Timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            if (item.restartAt) {
                const restartDiff = item.restartAt - now;
                if (restartDiff > 0) {
                    const seconds = Math.ceil(restartDiff / 1000);
                    setTimeLeft(`Restarting in ${seconds}s`);
                    setIsEnded(true);
                } else {
                    // Should be resetting soon
                    setTimeLeft('Restarting...');
                }
            } else {
                const diff = item.endTime - now;

                if (diff <= 0) {
                    setTimeLeft('Auction Ended');
                    setIsEnded(true);
                } else {
                    const minutes = Math.floor(diff / 60000);
                    const seconds = Math.floor((diff % 60000) / 1000);
                    setTimeLeft(`${minutes}m ${seconds}s`);
                    setIsEnded(false);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [item.endTime, item.restartAt]);

    // Flash animation logic
    useEffect(() => {
        if (item.lastBidTime) {
            setFlash('bg-green-100');
            const timer = setTimeout(() => setFlash(''), 500);
            return () => clearTimeout(timer);
        }
    }, [item.currentBid, item.lastBidTime]);

    const isWinning = item.lastBidder === socketId;
    // If I bid before but am not winning now, show outbid? 
    // For simplicity, if I am not winning and bid matches some criteria... 
    // User asked: "If I get outbid, instantly switch to a red 'Outbid' state."
    // This implies I need to track if I EVER bid on this item? Or just if I was the previous winner?
    // Let's assume tracking user intent is complex without local state. 
    // I'll stick to: If I am NOT the winner, but I am viewing it, maybe I see "Outbid" vs just normal?
    // Actually, "Outbid" status usually implies "I was winning, now I am lost".
    // Implementing simplified "Outbid" state: If I have placed a bid locally (tracked via state) and am not winning.

    const [hasBid, setHasBid] = useState(false);

    const handleBid = () => {
        placeBid(item.id, item.currentBid + 10);
        setHasBid(true);
    };

    const isOutbid = hasBid && !isWinning && !isEnded;

    return (
        <div className={clsx(
            "p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105",
            flash,
            isWinning ? "border-green-500 border-2 bg-green-50" : "bg-white",
            isOutbid ? "border-red-500 border-2 bg-red-50" : ""
        )}>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <p className="text-2xl font-bold text-blue-600">${item.currentBid}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Ends In</p>
                    <p className={clsx("font-mono font-bold", isEnded ? "text-red-500" : "text-gray-700")}>
                        {timeLeft}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                {isWinning && (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold">
                        WINNING
                    </span>
                )}
                {isOutbid && (
                    <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-xs font-bold">
                        OUTBID
                    </span>
                )}
                {!isWinning && !isOutbid && <span></span>} {/* Spacer */}

                <button
                    onClick={handleBid}
                    disabled={isEnded}
                    className={clsx(
                        "px-4 py-2 rounded-lg font-bold text-white transition-colors",
                        isEnded
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    )}
                >
                    Bid +$10
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
