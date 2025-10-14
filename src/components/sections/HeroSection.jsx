// src/components/sections/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Coin data for the floating top row
  const coinsData = Array(18)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      amount: "$0.15",
      subtitle: `Win #${(index + 1).toString().padStart(2, "0")}`,
    }));

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0"></div>

      {/* Floating Coins Row */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="relative overflow-hidden mt-[40px] sm:mt-[54px] md:mt-[70px] lg:mt-[54px]">
          {/* Scrolling container */}
          <motion.div
            className="flex gap-4 py-4 px-4"
            animate={{
              x: [0, -100 * coinsData.length],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Double the coins for seamless loop */}
            {[...coinsData, ...coinsData].map((coin, index) => (
              <motion.div
                key={`coin-${index}`}
                className="flex flex-col items-center min-w-[80px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 18) * 0.05, duration: 0.5 }}
              >
                {/* Coin Icon - Using SVG instead of emoji */}
                <div className="relative mb-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    {/* SVG Coin Icon */}
                    <svg
                      className="w-8 h-8 text-yellow-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h2v2h-2v2h2v2h-2v2h-2v-2H9v-2h2v-2H9V9h2V7z" />
                    </svg>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl"></div>
                </div>

                {/* Title */}
                <span
                  className="text-center"
                  style={{
                    color: "#D3D3D3",
                    fontFamily: '"Neue Plak", sans-serif',
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {coin.amount}
                </span>

                {/* Subtitle */}
                <span
                  className="text-center"
                  style={{
                    color: "#9D9D9D",
                    fontFamily: '"Neue Plak", sans-serif',
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {coin.subtitle}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Recent Wins Button - Floating Left */}
      {/* Recent Wins Button with dot indicator */}
      <motion.div
        className="absolute left-6 top-[4.5rem] z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          className="flex items-center gap-2 text-white font-medium text-sm transition-transform hover:scale-105"
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1.5px solid #222223",
            background: "linear-gradient(90deg, #7F0577 0%, #F474FB 100%)",
          }}
        >
          {/* White dot indicator */}
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "12px",
              opacity: 0.8,
              background: "#FFF",
              boxShadow: "0 0 8px 0 #FFF",
              flexShrink: 0,
            }}
          />
          <span>Recent Wins</span>
        </button>
      </motion.div>

      {/* Hero Content - Main Banner (adjusted position) */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {/* ✅ Background image (full-width & responsive) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home-assets/home-banner.png')" }}
        >
          {/* Optional: gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* ✅ Foreground content */}
        <div className="relative container mx-auto px-4 z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </div>

      {/* Alternative: If you want to use image icons instead of SVG, use this structure:
      <img 
        src="/icons/coin.png" 
        alt="coin" 
        className="w-8 h-8"
      />
      */}
    </section>
  );
};

export default HeroSection;
