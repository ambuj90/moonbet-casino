// src/components/sections/SlotsSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";

const SlotsSection = () => {
  const scrollContainerRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchGames = async () => {
    try {
      const { data } = await axios.get("/wallet-service/api/games");

      if (data?.games?.items) {
        setGames(data.games.items);
      } else {
        setGames([]); // fallback if API returns no games
      }
    } catch (error) {
      console.error("❌ Error fetching games:", error);
      toast.error(
        error.response?.data?.message || "Failed to load games list"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchGames();
}, []);


  const handlePlayNow = (gameName) => {
    // Replace spaces with dashes for clean URLs
    const gameSlug = encodeURIComponent(gameName);
    navigate(`/game/${gameSlug}`);
  };

  return (
    <section className="w-full relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* ... header code unchanged ... */}

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading games...</p>
        ) : (
          <div className="grid grid-flow-col auto-cols-[200px] gap-6 overflow-x-auto scrollbar-hide">
            {games.map((game, index) => (
              <motion.div
                key={game.uuid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#F07730]/50 transition-all duration-300">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">{game.name}</h3>
                    <p className="text-gray-400 text-xs mt-1">{game.provider}</p>
                  </div>

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayNow(game.name)}
                      className="px-6 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold"
                    >
                      PLAY NOW
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SlotsSection;
