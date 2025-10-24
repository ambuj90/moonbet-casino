// src/components/sections/HomeGamesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoonBetButton from "../ui-elements/MoonBetButton";

const HomeGamesSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Games data
  const gamesData = [
    {
      id: 1,
      title: "SLOTS",
      badge: "HOT",
      badgeColor: "bg-red-500",
      icon: "🎰",
      players: "2.3k",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "POKER",
      badge: "NEW",
      badgeColor: "bg-green-500",
      icon: "♠️",
      players: "1.8k",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "ROULETTE",
      icon: "🎡",
      players: "3.1k",
      gradient: "from-red-500 to-pink-500",
    },
    {
      id: 4,
      title: "BLACKJACK",
      badge: "LIVE",
      badgeColor: "bg-blue-500",
      icon: "🃏",
      players: "1.5k",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      id: 5,
      title: "DICE",
      icon: "🎲",
      players: "2.1k",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 6,
      title: "CRASH",
      badge: "POPULAR",
      badgeColor: "bg-purple-500",
      icon: "📈",
      players: "4.2k",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: 7,
      title: "WHEEL",
      icon: "🎯",
      players: "1.2k",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  // Check scroll position
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-20 bg-[#0A0B0D] relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👍</span>
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white">
              RECOMMENDED
            </h2>
          </div>

          <button className="hidden md:flex items-center">
            <MoonBetButton
              onClick={() => console.log(`${reward.buttonText} clicked`)}
            >
              To the Casino
            </MoonBetButton>
          </button>
        </motion.div>

        {/* Games Container */}
        <div className="relative">
          {/* Scroll Buttons - Desktop Only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              ←
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              →
            </button>
          )}

          {/* Games Grid */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
          >
            <div className="grid grid-flow-col auto-cols-[160px] sm:auto-cols-[180px] md:auto-cols-[200px] gap-4 md:gap-6">
              {gamesData.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-90`}
                    />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`,
                        }}
                      />
                    </div>

                    {/* Badge */}
                    {game.badge && (
                      <span
                        className={`absolute top-3 right-3 px-2 py-1 ${game.badgeColor} text-white text-xs font-bold rounded-full animate-pulse`}
                      >
                        {game.badge}
                      </span>
                    )}

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-4">
                      <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform">
                        {game.icon}
                      </span>
                      <h3 className="text-white font-bold text-base md:text-lg mb-2">
                        {game.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {game.players} playing
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-colors">
                        PLAY NOW
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex md:hidden justify-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold hover:scale-105 transition-transform">
            VIEW ALL GAMES
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

export default HomeGamesSection;
