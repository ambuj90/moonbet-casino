import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

// Icon Components
const TheaterModeIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="10" rx="2" />
    {isActive && <path d="M2 7h20M2 17h20" />}
  </svg>
);

const FullScreenIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path
      d="M12 1v6m0 6v6m-8-8h6m6 0h6m-4.22-6.78l-4.24 4.24m-4.24 4.24l-4.24 4.24m12.48 0l-4.24-4.24m-4.24-4.24L3.76 3.76"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GamePage = () => {
  const { gameId } = useParams();
  const iframeRef = useRef(null);

  const [theaterMode, setTheaterMode] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRealPlay, setIsRealPlay] = useState(true);

  // Fullscreen functionality
  const handleFullScreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  // Listen for Escape key to exit full screen and reset iframe position
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        document.exitFullscreen && document.exitFullscreen();
        iframeRef.current.style.position = "relative"; // Reset position
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Toggle for favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const gameData = {
    name: "Blackjack",
    provider: "Evolution",
    gameUrl:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&modestbranding=1",
  };

  return (
    <div className="h-auto md:h-screen flex flex-col bg-[#000] overflow-hidden">
      {/* Game Container */}
      <div className="flex-1 flex flex-col">
        {/* Game Iframe Container */}
        <div className="relative bg-black flex-1 sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[85vh]">
          <div className="h-[80vh] md:h-full flex items-center justify-center px-8 py-4">
            <div className="w-[90%] h-[90%] mt-[4rem] bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <iframe
                ref={iframeRef}
                src={gameData.gameUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={gameData.name}
              />
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        {/* Bottom Control Bar with Glassmorphism */}
        <div
          className="relative bg-white/5 backdrop-blur-xl border-t border-white/20"
          style={{
            height: "12vh",
            minHeight: "80px",
            background:
              "linear-gradient(135deg, rgba(30, 36, 51, 0.8) 0%, rgba(20, 25, 40, 0.9) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 -4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none"></div>

          <div className="relative h-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Left Side - Game Info with 80px margin */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 ml-0 sm:ml-10 md:ml-16 lg:ml-20">
              {/* 80px margin: ml-20 = 80px on large screens, scales down on smaller screens */}

              {/* Rainbet Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#F07730] to-[#EFD28E] flex items-center justify-center shadow-lg shadow-[#F07730]/30">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg">
                    R
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-white">
                    {gameData.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {gameData.provider}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Control Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Full Screen Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFullScreen}
                className="p-1.5 sm:p-2 md:p-2.5 rounded-lg transition-all bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-sm border border-white/10"
                title="Full Screen"
              >
                <FullScreenIcon />
              </motion.button>

              {/* Theater Mode Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheaterMode(!theaterMode)}
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg transition-all backdrop-blur-sm border ${
                  theaterMode
                    ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white shadow-lg shadow-[#F07730]/40 border-[#F07730]/50"
                    : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border-white/10"
                }`}
                title="Theater Mode"
              >
                <TheaterModeIcon isActive={theaterMode} />
              </motion.button>

              {/* Screenshot Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 md:p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 hover:text-white backdrop-blur-sm border border-white/10"
                title="Screenshot"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </motion.button>

              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFavorite}
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg transition-all backdrop-blur-sm border ${
                  isFavorite
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/40 border-yellow-400/50"
                    : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border-white/10"
                }`}
                title="Add to Favorites"
              >
                <StarIcon filled={isFavorite} />
              </motion.button>

              {/* Divider - Hidden on small screens */}
              <div className="hidden md:block w-px h-8 bg-white/30 mx-1 md:mx-2"></div>

              {/* Play Mode Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium">
                  Fun Play
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRealPlay(!isRealPlay)}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7 rounded-full transition-all backdrop-blur-sm border ${
                    isRealPlay
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40 border-blue-400/50"
                      : "bg-white/20 border-white/10"
                  }`}
                >
                  <motion.div
                    animate={{
                      x: isRealPlay
                        ? window.innerWidth < 640
                          ? 20
                          : window.innerWidth < 768
                          ? 24
                          : 28
                        : 2,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="absolute top-0.5 sm:top-1 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-white rounded-full shadow-lg"
                  />
                </motion.button>
                <span
                  className={`hidden text-[10px] sm:text-xs md:text-sm font-semibold ${
                    isRealPlay ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  Real Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
