// src/components/profile/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ FIX: added import

const ProfileModal = ({ isOpen, onClose, userData }) => {
  const [profileData, setProfileData] = useState({
    username: "Loading...",
    publicId: "...",
    memberSince: "...",
    rank: "Unranked",
    nextRank: "Bronze I",
    remainingToNextRank: 0,
    totalToNextRank: 5000,
    totalBets: 0,
    totalWagered: 0,
    avatarLevel: 1,
  });

  const navigate = useNavigate(); // ✅ FIX: properly initialized

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && userData) {
      fetchProfileData();
    }
  }, [isOpen, userData]);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      setProfileData({
        username: userData?.username || "Guest User",
        publicId: "ZZAV5JBCE0LC8VACZKBX5...",
        memberSince: new Date(
          userData?.createdAt || Date.now()
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rank: "Unranked",
        nextRank: "Bronze I",
        remainingToNextRank: 2687.05,
        totalToNextRank: 5000,
        totalBets: 841,
        totalWagered: 1312.95,
        avatarLevel: Math.floor(Math.random() * 10) + 1,
      });
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const progressPercentage =
    ((profileData.totalToNextRank - profileData.remainingToNextRank) /
      profileData.totalToNextRank) *
    100;

  const copyPublicId = () => {
    navigator.clipboard.writeText(profileData.publicId);
    toast.success("Public ID copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed h-screen inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container - Responsive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[95%] sm:max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-gradient-to-br from-[#1a1d24]/95 to-[#13161F]/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Glow Effects */}
              <div className="absolute -top-20 -left-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#F07730]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#EFD28E]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative p-4 sm:p-5 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Profile
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <svg
                      className="w-5 h-5 text-white/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Public ID - Responsive */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Public ID:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-xs sm:text-sm font-mono truncate max-w-[200px] sm:max-w-none">
                      {profileData.publicId}
                    </span>
                    <button
                      onClick={copyPublicId}
                      className="p-1 rounded hover:bg-white/10 transition-all flex-shrink-0"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Content - Responsive Padding */}
              <div className="relative p-4 sm:p-5 md:p-6">
                {/* User Info Section - Responsive */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#F07730]/20 to-[#EFD28E]/20 rounded-xl border-2 border-[#F07730]/30 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-lg flex items-center justify-center transform rotate-45">
                        <span className="text-black font-bold text-lg sm:text-xl transform -rotate-45">
                          {profileData.avatarLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Details - Centered on mobile */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {profileData.username}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Member since: {profileData.memberSince}
                    </p>
                  </div>
                </div>

                {/* Rank Progress Section */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2">
                    <span className="text-[#F07730] font-semibold text-sm sm:text-base">
                      {profileData.rank}
                    </span>
                    <span className="text-white font-semibold text-sm sm:text-base">
                      ${profileData.remainingToNextRank.toFixed(2)} remaining
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute h-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">
                      {profileData.rank}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded transform rotate-45" />
                      <span className="text-orange-400 text-xs sm:text-sm font-semibold">
                        {profileData.nextRank}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid - Responsive */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Total Bets */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Total Bets
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {profileData.totalBets.toLocaleString()}
                    </p>
                  </div>

                  {/* Total Wagered */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Total Wagered
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      ${profileData.totalWagered.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg sm:rounded-xl text-black font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-[#F07730]/30 transition-all">
                    View Full Stats
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex-1 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base transition-all border border-white/10"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
