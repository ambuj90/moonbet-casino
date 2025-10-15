// src/components/sections/GameBetsSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameBetsSection = ({ userId = null }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample bet data
  const allBetsData = [
    {
      id: 1,
      game: "Dice",
      user: "Player***123",
      bet: 0.05,
      multiplier: 2.0,
      payout: 0.1,
      status: "win",
      time: "2 mins ago",
    },
    {
      id: 2,
      game: "Slots",
      user: "Lucky***456",
      bet: 0.1,
      multiplier: 0.0,
      payout: 0.0,
      status: "loss",
      time: "3 mins ago",
    },
    {
      id: 3,
      game: "Crash",
      user: "Moon***789",
      bet: 0.2,
      multiplier: 5.23,
      payout: 1.046,
      status: "win",
      time: "5 mins ago",
    },
    {
      id: 4,
      game: "Roulette",
      user: "Star***321",
      bet: 0.15,
      multiplier: 2.0,
      payout: 0.3,
      status: "win",
      time: "7 mins ago",
    },
    {
      id: 5,
      game: "Blackjack",
      user: "Ace***654",
      bet: 0.5,
      multiplier: 1.5,
      payout: 0.75,
      status: "win",
      time: "10 mins ago",
    },
  ];

  // My bets data (filtered for current user)
  const myBetsData = [
    {
      id: 1,
      game: "Dice",
      user: "You",
      bet: 0.1,
      multiplier: 2.0,
      payout: 0.2,
      status: "win",
      time: "1 hour ago",
    },
    {
      id: 2,
      game: "Slots",
      user: "You",
      bet: 0.05,
      multiplier: 0.0,
      payout: 0.0,
      status: "loss",
      time: "2 hours ago",
    },
    {
      id: 3,
      game: "Crash",
      user: "You",
      bet: 0.15,
      multiplier: 3.45,
      payout: 0.5175,
      status: "win",
      time: "3 hours ago",
    },
  ];

  useEffect(() => {
    // Load initial bets
    loadBets();

    // Simulate live updates
    const interval = setInterval(() => {
      if (activeTab === "all") {
        addNewBet();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const loadBets = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBets(activeTab === "all" ? allBetsData : myBetsData);
      setIsLoading(false);
    }, 500);
  };

  const addNewBet = () => {
    const games = ["Dice", "Slots", "Crash", "Roulette", "Blackjack"];
    const newBet = {
      id: Date.now(),
      game: games[Math.floor(Math.random() * games.length)],
      user: `Player***${Math.floor(Math.random() * 999)}`,
      bet: (Math.random() * 0.5).toFixed(2),
      multiplier: (Math.random() * 10).toFixed(2),
      payout: 0,
      status: Math.random() > 0.5 ? "win" : "loss",
      time: "Just now",
    };

    newBet.payout =
      newBet.status === "win" ? (newBet.bet * newBet.multiplier).toFixed(2) : 0;

    setBets((prev) => [newBet, ...prev.slice(0, 4)]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setBets(tab === "all" ? allBetsData : myBetsData);
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold text-white mb-2">
            Live Casino Bets
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Watch real-time bets from players around the world
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4 sm:mb-6 border-b border-white/10 overflow-x-auto scrollbar-hide">
          <button
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-all relative whitespace-nowrap ${
              activeTab === "all"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("all")}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              All Bets
            </span>
            {activeTab === "all" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F07730] to-[#EFD28E]"
              />
            )}
          </button>

          <button
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-all relative whitespace-nowrap ${
              activeTab === "my"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("my")}
          >
            My Bets
            {activeTab === "my" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F07730] to-[#EFD28E]"
              />
            )}
          </button>
        </div>

        {/* Bets Table - Desktop/Tablet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Desktop/Tablet Table View - Hidden on Mobile */}
          <div className="hidden md:block">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-2 lg:gap-4 p-3 lg:p-4 border-b border-white/10 bg-black/30">
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                Game
              </div>
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                User
              </div>
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                Bet Amount
              </div>
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                Multiplier
              </div>
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                Payout
              </div>
              <div className="text-gray-400 text-xs lg:text-sm font-medium">
                Time
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730]"></div>
                  </div>
                ) : bets.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    No bets to display
                  </div>
                ) : (
                  bets.map((bet, index) => (
                    <motion.div
                      key={bet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="grid grid-cols-6 gap-2 lg:gap-4 p-3 lg:p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="px-2 lg:px-3 py-1 bg-white/10 rounded-full text-xs lg:text-sm text-white truncate">
                          {bet.game}
                        </span>
                      </div>
                      <div className="text-gray-300 text-xs lg:text-sm flex items-center truncate">
                        {bet.user}
                      </div>
                      <div className="text-white text-xs lg:text-sm flex items-center">
                        {bet.bet} SOL
                      </div>
                      <div className="text-cyan-400 text-xs lg:text-sm flex items-center">
                        {bet.multiplier}x
                      </div>
                      <div
                        className={`text-xs lg:text-sm flex items-center ${
                          bet.status === "win"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {bet.status === "win" ? "+" : "-"}
                        {bet.payout} SOL
                      </div>
                      <div className="text-gray-500 text-xs lg:text-sm flex items-center">
                        {bet.time}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730]"></div>
                </div>
              ) : bets.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No bets to display
                </div>
              ) : (
                bets.map((bet, index) => (
                  <motion.div
                    key={bet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {bet.game}
                      </span>
                      <span className="text-gray-500 text-xs">{bet.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">User:</span>
                      <span className="text-white">{bet.user}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Bet:</span>
                      <span className="text-white">{bet.bet} SOL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Result:</span>
                      <span
                        className={
                          bet.status === "win"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {bet.multiplier}x → {bet.status === "win" ? "+" : "-"}
                        {bet.payout} SOL
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6 sm:mt-8"
        >
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors">
            View More Bets
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GameBetsSection;
