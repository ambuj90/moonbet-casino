// src/pages/GamePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";
import axios from "axios";

const GamePage = () => {
  const { gameId } = useParams(); // actually the game name
  const iframeRef = useRef(null);
  const [gameData, setGameData] = useState(null);
  const [iframeUrl, setIframeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRealPlay, setIsRealPlay] = useState(true);

  useEffect(() => {
    const fetchGameUrl = async () => {
      try {
        // 🕹 Step 1: Fetch all games
        const { data } = await axios.get("/wallet-service/api/games");

        const game = data?.games?.items?.find(
          (g) => g.name.toLowerCase() === decodeURIComponent(gameId).toLowerCase()
        );

        if (!game) {
          toast.error("Game not found!");
          return;
        }

        setGameData(game);

        // 🎮 Step 2: Initialize demo game
        const { data: initData } = await axios.post(
          `/wallet-service/api/games/${game.uuid}/init-demo`,
          {
            device: "desktop",
            language: "en",
            return_url: window.location.origin,
          }
        );

        if (initData.success && initData.data?.url) {
          setIframeUrl(initData.data.url);
        } else {
          throw new Error("Failed to initialize demo game");
        }
      } catch (error) {
        console.error("❌ Error loading game:", error);
        toast.error(error.response?.data?.message || error.message || "Unable to load game");
      } finally {
        setLoading(false);
      }
    };

    fetchGameUrl();
  }, [gameId]);

  // useEffect(() => {
  //   const fetchGameUrl = async () => {
  //     try {
  //       // Step 1: Get all games
  //       const res = await fetch("https://mapi.examtree.ai/wallet-service/api/games");
  //       const data = await res.json();
  //       const game = data?.games?.items?.find(
  //         (g) => g.name.toLowerCase() === decodeURIComponent(gameId).toLowerCase()
  //       );

  //       if (!game) {
  //         toast.error("Game not found!");
  //         return;
  //       }

  //       setGameData(game);

  //       // Step 2: Call init-demo API with that UUID
  //       const initRes = await fetch(
  //         `https://mapi.examtree.ai/wallet-service/api/games/${game.uuid}/init-demo`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             device: "desktop",
  //             language: "en",
  //             return_url: window.location.origin,
  //           }),
  //         }
  //       );

  //       const initData = await initRes.json();
  //       if (initData.success && initData.data?.url) {
  //         setIframeUrl(initData.data.url);
  //       } else {
  //         throw new Error("Failed to initialize demo game");
  //       }
  //     } catch (error) {
  //       console.error("Error loading game:", error);
  //       toast.error(error.message || "Unable to load game");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGameUrl();
  // }, [gameId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading Game...
      </div>
    );
  }

  if (!iframeUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl">
        Failed to load game.
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          className="w-full h-full border-none"
          allowFullScreen
          title={gameData?.name || "Game"}
        />
      </div>
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
  );
};

export default GamePage;
