// src/components/sections/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Recent wins data with game cards
  const recentWinsData = [
    {
      id: 1,
      game: "GOLDEN JOKER 2X3 FORTUNE",
      gameImage: "/games/golden-joker.jpg",
      username: "Fles...",
      amount: "$0.04",
      bgGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: 2,
      game: "DICE",
      gameImage: "/games/dice.jpg",
      username: "Hidden",
      amount: "$0.16",
      bgGradient: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      game: "DICE",
      gameImage: "/games/dice.jpg",
      username: "joew...",
      amount: "$2.84",
      bgGradient: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      game: "DICE",
      gameImage: "/games/dice.jpg",
      username: "Phil...",
      amount: "$1.01",
      bgGradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      game: "BLACKJACK",
      gameImage: "/games/blackjack.jpg",
      username: "Tdub...",
      amount: "$100.00",
      bgGradient: "from-gray-800 to-gray-900",
    },
    {
      id: 6,
      game: "GATES OF OLYMPUS 1000",
      gameImage: "/games/gates-olympus.jpg",
      username: "Denz...",
      amount: "$3.33",
      bgGradient: "from-purple-600 to-pink-600",
    },
    {
      id: 7,
      game: "BIG BASS BONANZA",
      gameImage: "/games/big-bass.jpg",
      username: "Inne...",
      amount: "$1.13",
      bgGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: 8,
      game: "BANDIT",
      gameImage: "/games/bandit.jpg",
      username: "bizz...",
      amount: "$1.32",
      bgGradient: "from-orange-600 to-red-600",
    },
    {
      id: 9,
      game: "WILD CARD GANG",
      gameImage: "/games/wild-card.jpg",
      username: "shir...",
      amount: "$2.43",
      bgGradient: "from-gray-700 to-gray-800",
    },
    {
      id: 10,
      game: "KENO",
      gameImage: "/games/keno.jpg",
      username: "Earl...",
      amount: "$16.25",
      bgGradient: "from-purple-700 to-indigo-700",
    },
    {
      id: 11,
      game: "LIMBO",
      gameImage: "/games/limbo.jpg",
      username: "Sayk...",
      amount: "$2.50",
      bgGradient: "from-yellow-600 to-orange-600",
    },
    {
      id: 12,
      game: "PLINKO",
      gameImage: "/games/plinko.jpg",
      username: "Niki...",
      amount: "$3.20",
      bgGradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 13,
      game: "BIG BASS HALLOWEEN",
      gameImage: "/games/big-bass-halloween.jpg",
      username: "damc...",
      amount: "$1.60",
      bgGradient: "from-green-700 to-teal-700",
    },
    {
      id: 14,
      game: "BURNING COINS 20",
      gameImage: "/games/burning-coins.jpg",
      username: "Hidden",
      amount: "$3.90",
      bgGradient: "from-red-700 to-orange-700",
    },
    {
      id: 15,
      game: "BURNING COINS 20",
      gameImage: "/games/burning-coins.jpg",
      username: "Hidden",
      amount: "$3.90",
      bgGradient: "from-red-700 to-orange-700",
    },
    {
      id: 16,
      game: "BURNING COINS 20",
      gameImage: "/games/burning-coins.jpg",
      username: "Hidden",
      amount: "$3.90",
      bgGradient: "from-red-700 to-orange-700",
    },
    {
      id: 17,
      game: "BURNING COINS 20",
      gameImage: "/games/burning-coins.jpg",
      username: "Hidden",
      amount: "$3.90",
      bgGradient: "from-red-700 to-orange-700",
    },
    {
      id: 18,
      game: "BURNING COINS 20",
      gameImage: "/games/burning-coins.jpg",
      username: "Hidden",
      amount: "$3.90",
      bgGradient: "from-red-700 to-orange-700",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.08,
      y: -5,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0"></div>

      {/* Recent Wins Section */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/90 to-transparent">
        <div className="relative mt-[40px] sm:mt-[54px] md:mt-[70px] lg:mt-[54px]">
          {/* Recent Wins Label with Animation */}
          <motion.div
            className="flex items-center gap-2 px-2 sm:px-4 py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </motion.span>
            <span className="text-white text-sm font-medium">Recent Wins</span>
          </motion.div>

          {/* Mobile: Horizontal Scroll | Desktop: Responsive Grid */}
          <motion.div
            className="px-2 sm:px-4 pb-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile View - Horizontal Scroll */}
            <div className="sm:hidden overflow-x-auto scrollbar-hide">
              <motion.div
                className="flex gap-1.5"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {/* Double cards for seamless loop on mobile */}
                {[...recentWinsData, ...recentWinsData].map((win, index) => (
                  <motion.div
                    key={`mobile-${index}`}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex flex-col items-center cursor-pointer flex-shrink-0"
                    custom={index}
                  >
                    {/* Game Card Container */}
                    <div className="relative">
                      {/* Game Card */}
                      <motion.div
                        className={`relative w-[88px] h-[116px] rounded-lg overflow-hidden bg-gradient-to-br ${win.bgGradient} shadow-lg`}
                        whileHover={{
                          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        }}
                      >
                        {/* Game Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <div className="text-white text-center">
                            <div className="text-[9px] font-bold uppercase mb-1 leading-tight line-clamp-2">
                              {win.game}
                            </div>
                            <motion.div
                              className="w-10 h-10 bg-white/20 rounded-md mx-auto mb-1 flex items-center justify-center"
                              whileHover={{
                                rotate: 360,
                                transition: { duration: 0.5 },
                              }}
                            >
                              <svg
                                className="w-6 h-6 text-white/80"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/0 pointer-events-none"
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>

                      {/* Win Badge */}
                      <motion.div
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.03 + 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        WIN
                      </motion.div>
                    </div>

                    {/* Username */}
                    <div className="mt-1 text-center w-full">
                      <span className="text-gray-300 text-xs font-medium">
                        {win.username}
                      </span>
                    </div>

                    {/* Win Amount */}
                    <div className="text-center w-full">
                      <span className="text-green-400 text-sm font-bold">
                        {win.amount}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Desktop View - Fixed width container for 14 cards in a row */}
            <div className="hidden sm:block overflow-x-auto scrollbar-hide">
              <div
                className="flex gap-1 lg:gap-1.5 xl:gap-2"
                style={{ width: "max-content" }}
              >
                {recentWinsData.map((win, index) => (
                  <motion.div
                    key={win.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex flex-col items-center cursor-pointer relative flex-shrink-0"
                    custom={index}
                  >
                    {/* Game Card Container */}
                    <div className="relative">
                      {/* Game Card */}
                      <motion.div
                        className={`relative w-[88px] h-[116px] rounded-lg overflow-hidden bg-gradient-to-br ${win.bgGradient} shadow-lg`}
                        whileHover={{
                          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        }}
                      >
                        {/* Game Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <div className="text-white text-center">
                            <div className="text-[9px] font-bold uppercase mb-1 leading-tight line-clamp-2">
                              {win.game}
                            </div>
                            <motion.div
                              className="w-10 h-10 bg-white/20 rounded-md mx-auto mb-1 flex items-center justify-center"
                              whileHover={{
                                rotate: 360,
                                transition: { duration: 0.5 },
                              }}
                            >
                              <svg
                                className="w-6 h-6 text-white/80"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/0 pointer-events-none"
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>

                      {/* Win Badge */}
                      {/* <motion.div
                        className="absolute -top-1 -right-1 z-[9999] bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.03 + 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        WIN
                      </motion.div> */}
                    </div>

                    {/* Username */}
                    <motion.div
                      className="mt-1 text-center w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 + 0.3 }}
                    >
                      <span className="text-gray-300 text-xs font-medium">
                        {win.username}
                      </span>
                    </motion.div>

                    {/* Win Amount */}
                    <motion.div
                      className="text-center w-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.03 + 0.4,
                        type: "spring",
                        stiffness: 150,
                      }}
                    >
                      <motion.span
                        className="text-green-400 text-sm font-bold"
                        whileHover={{ scale: 1.1 }}
                      >
                        {win.amount}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Content - Main Banner */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home-assets/home-banner.png')" }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Foreground content */}
        <div className="relative container mx-auto px-4 z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
