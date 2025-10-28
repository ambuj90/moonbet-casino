// src/components/sections/HomeRewardsSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoonBetButton from "../ui-elements/MoonBetButton";

const HomeRewardsSection = () => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rewards data
  const rewardsData = [
    {
      id: 1,
      badge: "NOW LIVE",
      title: "New Rewards System",
      description:
        "Enhanced rewards program with daily bonuses, tier benefits, and exclusive perks for active players",
      buttonText: "SEE REWARDS",
      icon: "🎁",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      id: 2,
      badge: "NOW LIVE",
      title: "Staking Rewards",
      description:
        "Lock your SOL tokens to earn passive rewards and governance rights in our ecosystem.",
      buttonText: "START STAKING",
      icon: "💎",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      badge: "NOW LIVE",
      title: "Referral Rewards",
      description:
        "Earn lifetime commissions by inviting friends to join MoonBet gaming platform.",
      buttonText: "INVITE FRIENDS",
      icon: "🚀",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  // Handle scroll to update current index for indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);

    setCurrentIndex(Math.min(newIndex, rewardsData.length - 1));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section className="w-full py-16 md:py-20 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full mx-auto px-4">
        {/* Cards Container - Scrollable on mobile, grid on desktop */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto lg:overflow-visible scrollbar-hide px-4 lg:px-8"
        >
          <div className="flex lg:grid lg:grid-cols-3 gap-6 pb-4">
            {rewardsData.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[85vw]  lg:w-full"
              >
                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#F07730]/50 transition-all duration-300 group">
                  {/* Badge */}
                  {reward.badge && (
                    <span className="inline-block px-3 py-1 text-[#F07730] text-xs font-semibold mb-4">
                      {reward.badge}
                    </span>
                  )}

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {reward.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                    {reward.description}
                  </p>

                  {/* Button */}
                  <div className="flex justify-start">
                    <MoonBetButton
                      onClick={() =>
                        console.log(`${reward.buttonText} clicked`)
                      }
                    >
                      {reward.buttonText}
                    </MoonBetButton>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F07730]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicators */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
          {rewardsData.map((_, index) => (
            <span
              key={index}
              className={`transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 h-2 bg-[#F07730] rounded-full"
                  : "w-2 h-2 bg-white/20 rounded-full"
              }`}
            />
          ))}
        </div>
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

export default HomeRewardsSection;
