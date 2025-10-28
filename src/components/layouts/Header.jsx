// Enhanced Header.jsx with Sidebar Toggle and Futuristic Casino UI
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import WalletSettingsModal from "../WalletSettingsModal";
import WalletModal from "../WalletModal";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import axios from "axios";

// 3D Rotating Coin Component
const RotatingCoin = () => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.15, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </Float>
  );
};

const Header = ({
  onMobileSidebarToggle,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
  onDesktopSidebarToggle,
  isDesktopSidebarCollapsed = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    isDesktopSidebarCollapsed
  );
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [walletSettingsOpen, setWalletSettingsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const location = useLocation();
  const walletDropdownRef = useRef(null);

  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setHasToken(!!token);
    };

    // Watch for login/logout actions — custom event
    window.addEventListener("tokenChanged", checkToken);

    // Optional: also handle cross-tab changes
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("tokenChanged", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        // Replace with dynamic user ID if available in localStorage later
        const response = await axios.get(
          "/wallet-service/api/wallet/68f4849c321d58f1f8be302a/balance"
        );

        if (response.data && response.data.totalUsd) {
          setWalletBalance(response.data.totalUsd.toFixed(2));
        } else {
          setWalletBalance("0.00");
        }
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance("0.00");
      }
    };

    if (hasToken) {
      fetchWalletBalance();
    }
  }, [hasToken]);

  // Currencies with neon colors
  // const currencies = [
  //   {
  //     symbol: "BTC",
  //     name: "Bitcoin",
  //     balance: "0.00000",
  //     icon: "₿",
  //     color: "bg-orange-400",
  //   },
  //   {
  //     symbol: "ETH",
  //     name: "Ethereum",
  //     balance: "0.00000",
  //     icon: "Ξ",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     symbol: "LTC",
  //     name: "Litecoin",
  //     balance: "0.00000",
  //     icon: "Ł",
  //     color: "bg-blue-800",
  //   },
  //   {
  //     symbol: "USDT",
  //     name: "Tether",
  //     balance: "0.00000",
  //     icon: "₮",
  //     color: "bg-green-500",
  //   },
  //   {
  //     symbol: "SOL",
  //     name: "Solana",
  //     balance: "0.00000",
  //     icon: "◎",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     symbol: "DOGE",
  //     name: "Dogecoin",
  //     balance: "0.00000",
  //     icon: "Ð",
  //     color: "bg-yellow-500",
  //   },
  //   {
  //     symbol: "BCH",
  //     name: "Bitcoin Cash",
  //     balance: "0.00000",
  //     icon: "฿",
  //     color: "bg-green-400",
  //   },
  //   {
  //     symbol: "XRP",
  //     name: "Ripple",
  //     balance: "0.00000",
  //     icon: "✕",
  //     color: "bg-gray-600",
  //   },
  //   {
  //     symbol: "TRX",
  //     name: "Tron",
  //     balance: "0.00000",
  //     icon: "⟠",
  //     color: "bg-red-500",
  //   },
  // ];
  //   const [currencies, setCurrencies] = useState([]);
  // const [selectedCurrency, setSelectedCurrency] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await axios.get("/wallet-service/api/wallet/coins");

        // Map server data + assign color/icon dynamically
        const colorMap = {
          BTC: "bg-orange-400",
          ETH: "bg-blue-500",
          USDTTRC20: "bg-green-500",
          SOL: "bg-purple-500",
          BNBMAINNET: "bg-yellow-400",
          XRP: "bg-gray-500",
          ADA: "bg-blue-400",
          DOGECOIN: "bg-yellow-500",
          TRX: "bg-red-500",
          LTC: "bg-blue-800",
          DOT: "bg-pink-500",
          MATICMAINNET: "bg-indigo-500",
          AVAX: "bg-red-400",
          XLM: "bg-cyan-400",
          BCH: "bg-green-400",
        };

        const formatted = data.map((coin) => ({
          ...coin,
          color: colorMap[coin.symbol] || "bg-gray-700",
          iconPath: `/node_modules/cryptocurrency-icons/svg/color/${coin.symbol
            .replace("MAINNET", "")
            .replace("TRC20", "")
            .replace("COIN", "")
            .toLowerCase()}.svg`,
        }));

        setCurrencies(formatted);
        setSelectedCurrency(formatted[0]);
      } catch (err) {
        console.error("Error fetching currencies:", err);
      }
    };

    fetchCurrencies();
  }, []);

  // const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  // const [searchQuery, setSearchQuery] = useState("");

  // Enhanced menu items with gradient colors
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "🏠",
      path: "/",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: "games",
      label: "Games",
      icon: "🎮",
      gradient: "from-pink-500 to-purple-500",
      submenu: [
        { path: "/game/honeypot", label: "HoneyPot", icon: "🍯" },
        { path: "/game/coinflip", label: "CoinFlip", icon: "🪙" },
        { path: "/game/pumpdump", label: "Pump.Dump", icon: "📈" },
        { path: "/game/futures", label: "Futures", icon: "📊" },
        { path: "/game/crash", label: "Crash", icon: "🚀" },
        { path: "/game/mines", label: "Mines", icon: "💣" },
        { path: "/game/plinko", label: "Plinko", icon: "🎱" },
        { path: "/game/dice", label: "Dice", icon: "🎲" },
      ],
    },
    {
      id: "casino",
      label: "Casino",
      icon: "🎰",
      gradient: "from-yellow-500 to-orange-500",
      submenu: [
        { path: "/casino/slots", label: "Slots", icon: "🎰" },
        { path: "/casino/blackjack", label: "Blackjack", icon: "♠️" },
        { path: "/casino/roulette", label: "Roulette", icon: "🎯" },
        { path: "/casino/poker", label: "Poker", icon: "🃏" },
        { path: "/casino/baccarat", label: "Baccarat", icon: "👑" },
      ],
    },
    {
      id: "promotions",
      label: "Promotions",
      icon: "🎁",
      path: "#",
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: "vip",
      label: "VIP Club",
      icon: "💎",
      path: "#",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "chat",
      label: "Live Chat",
      icon: "💬",
      path: "/chat",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  const accountItems = [
    { path: "#", label: "My Profile", icon: "👤" },
    { path: "#", label: "Wallet", icon: "💳" },
    { path: "/bet-history", label: "Bet History", icon: "📊" },
    { path: "/transactions", label: "Transactions", icon: "💸" },
    { path: "#", label: "My Bonuses", icon: "🎁" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  // Toggle desktop sidebar collapse
  const toggleDesktopSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    setActiveSubmenu(null);

    // Notify parent component (Layout) about sidebar state change
    if (onDesktopSidebarToggle) {
      onDesktopSidebarToggle(newCollapsedState);
    }
  };

  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuId) => {
    if (!sidebarCollapsed) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const closeMobileSidebar = () => {
    if (onCloseMobileSidebar) {
      onCloseMobileSidebar();
    }
  };

  // Handle click outside for wallet dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target)
      ) {
        setWalletDropdownOpen(false);
      }
    };

    if (walletDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [walletDropdownOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    if (!sidebarCollapsed) {
      closeSidebar();
    }
    closeMobileSidebar();
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if ((sidebarOpen && !sidebarCollapsed) || isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen, sidebarCollapsed, isMobileSidebarOpen]);

  return (
    <>
      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0A0B0D]/95 via-[#141519]/95 to-[#0A0B0D]/95 backdrop-blur-xl border-b border-white/10 z-50"
      >
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left Section - Logo & Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDesktopSidebar}
              className="hidden lg:flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 group"
            >
              <motion.div
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5"
              >
                <span
                  className={`block h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                    sidebarCollapsed ? "w-5" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                    sidebarCollapsed ? "w-3" : "w-4"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                    sidebarCollapsed ? "w-4" : "w-6"
                  }`}
                ></span>
              </motion.div>
            </motion.button>

            {/* Logo with 3D Coin */}
            <Link to="/" className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
                <img
                  src="/icons/logo.svg"
                  alt="Moonbet Logo"
                  className="w-30 h-30 object-contain hidden md:block md:mx-4"
                />
                <img
                  src="/home-assets/mobile-logo.svg"
                  alt="Moonbet Logo mobile"
                  className="w-30 h-30 object-contain block md:hidden"
                />
              </span>
            </Link>
          </div>

          {/* Right Section - Balance, Coins, and Profile */}
          {/* Center Section - Balance and Coins */}
          {hasToken && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              {/* Balance Display with Dropdown */}
              <div
                className="relative flex justify-center sm:justify-start"
                ref={walletDropdownRef}
              >
                {/* Wallet Button */}
                <button
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  className="wallet-btn relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
               rounded-xl backdrop-blur-[2px] bg-[#000]/80 text-white 
               transition-all duration-300 max-w-[150px] sm:max-w-none"
                >
                  {/* Coin logo */}
                  <img
                    src={
                      selectedCurrency
                        ? selectedCurrency.iconPath
                        : "/icons/default-coin.svg"
                    }
                    alt={selectedCurrency?.name || "Currency"}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />

                  {/* Balance text */}
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
                    ${walletBalance}
                  </span>

                  {/* Dropdown arrow */}
                  <svg
                    className={`w-3 sm:w-4 h-3 sm:h-4 text-white/70 transition-transform duration-200 ${
                      walletDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Wallet Dropdown */}
                {walletDropdownOpen && (
                  <div
                    className="walletbtnnn absolute left-[80%] sm:left-1/2 md:left-1/2 -translate-x-1/2 mt-10 w-[90vw] sm:w-80 bg-[#1A1D24]/95
                 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    style={{
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <div className="p-3 sm:p-4 border-b border-white/10">
                      <div className="relative">
                        <svg
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search Currencies"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 
  rounded-lg focus:outline-none focus:border-green-500/50 
  text-xs sm:text-sm text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="max-h-60 sm:max-h-80 overflow-y-auto wallet-scrollbar">
                      {currencies
                        .filter(
                          (currency) =>
                            currency.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            currency.symbol
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((currency) => (
                          <div
                            key={currency.symbol}
                            onClick={() => {
                              setSelectedCurrency(currency);
                              setWalletDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between p-2 sm:p-3 cursor-pointer transition-all rounded-lg
        ${
          selectedCurrency?.symbol === currency.symbol
            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 shadow-inner"
            : "hover:bg-white/5 border border-transparent"
        }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${currency.color} flex items-center justify-center`}
                              >
                                <img
                                  src={currency.iconPath}
                                  alt={currency.name}
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/icons/default-coin.svg";
                                  }}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white font-medium text-xs sm:text-sm">
                                  {currency.name}
                                </span>
                                <span className="text-gray-400 text-[11px] sm:text-xs">
                                  {currency.symbol}
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-400 font-mono text-xs sm:text-sm">
                              0.00000
                            </span>
                          </div>
                        ))}
                    </div>

                    <div className="p-2 sm:p-3 border-t border-white/10">
                      <button
                        onClick={() => {
                          setWalletDropdownOpen(false);
                          setWalletSettingsOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 
                     bg-white/5 hover:bg-white/10 rounded-lg transition-all text-xs sm:text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-300">Wallet Settings</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Coins/Chips Display - Wallet Button */}
              <button
                onClick={() => setWalletModalOpen(true)}
                className="wallet-btn2 relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#000]/80 transition-all hover:scale-[1.02]"
              >
                <span className="text-xl">
                  <img
                    src="/icons/wallet.svg" // 👈 your image path
                    alt="Wallet Icon"
                    className="w-6 h-6 object-contain"
                  />
                </span>
              </button>
            </div>
          )}

          {/* Right Section - Profile and Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop only */}
            <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors">
              <img
                src="/icons/search.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {/* gift - Desktop only */}
            <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <img
                src="/icons/gift.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {/* win - Desktop only */}
            <button className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors">
              <img
                src="/icons/win.svg" // 👈 replace with your image path
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Profile Avatar */}
            {/* Trigger Button */}
            <LoginTrigger
              buttonText={
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/login.svg" // 👈 replace with your image path
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            />
          </div>
        </div>
      </motion.header>

      {/* DESKTOP SIDEBAR - Collapsible */}
      <div className="hidden lg:block">
        {/* Backdrop for mobile/tablet */}
        {sidebarOpen && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Desktop Sidebar with Glassmorphism */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? 80 : 256,
            x: 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed left-0 top-16 bottom-0 bg-gradient-to-b from-[#0A0B0D]/95 to-[#141519]/95 backdrop-blur-xl border-r border-white/10 z-40 overflow-hidden`}
        >
          <div className="h-full custom-scrollbar">
            {/* Main Menu */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3"
                  >
                    Main Menu
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: sidebarCollapsed ? 1.1 : 1.02 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between"
                          } px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden`}
                        >
                          {/* Background gradient on hover */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>

                          <div
                            className={`flex items-center ${
                              sidebarCollapsed ? "" : "gap-3"
                            } relative z-10`}
                          >
                            <motion.span
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="text-xl"
                            >
                              {item.icon}
                            </motion.span>
                            <AnimatePresence>
                              {!sidebarCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="text-white font-medium"
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {!sidebarCollapsed && (
                            <motion.svg
                              animate={{
                                rotate: activeSubmenu === item.id ? 180 : 0,
                              }}
                              className="w-4 h-4 text-gray-400 relative z-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23]/95 backdrop-blur-lg border border-white/20 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </motion.button>

                        {/* Submenu with animation */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mr-0 mt-1 overflow-hidden"
                            >
                              <div className="p-2 space-y-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
                                {item.submenu.map((subItem, index) => (
                                  <motion.div
                                    key={subItem.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                  >
                                    <Link
                                      to={subItem.path}
                                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                                        location.pathname === subItem.path
                                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-2 border-purple-500"
                                          : ""
                                      }`}
                                      onClick={closeSidebar}
                                    >
                                      <span className="text-lg opacity-70">
                                        {subItem.icon}
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {subItem.label}
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: sidebarCollapsed ? 1.1 : 1.02 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center ${
                            sidebarCollapsed ? "justify-center" : "gap-3"
                          } px-3 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                              : ""
                          }`}
                          onClick={closeSidebar}
                        >
                          {/* Background gradient on hover */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>

                          <motion.span
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl relative z-10"
                          >
                            {item.icon}
                          </motion.span>
                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-white font-medium relative z-10 cursor-pointer"
                                onClick={() => {
                                  if (item.id === "chat") {
                                    // ✅ Open Tidio chat if available
                                    if (window.tidioChatApi) {
                                      window.tidioChatApi.open();
                                    } else {
                                      console.warn(
                                        "Tidio chat not loaded yet."
                                      );
                                    }
                                  } else if (item.path) {
                                    // ✅ For other menu items — normal navigation
                                    navigate(item.path);
                                  }
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Active indicator */}
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                            />
                          )}

                          {/* Tooltip for collapsed state */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23]/95 backdrop-blur-lg border border-white/20 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Menu */}
            <div className="p-4 border-t border-white/10">
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3"
                  >
                    Account
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                {accountItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: sidebarCollapsed ? 1.1 : 1.02 }}
                    className="relative group"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : "gap-3"
                      } px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                          : ""
                      }`}
                      onClick={closeSidebar}
                    >
                      <span className="text-xl opacity-80">{item.icon}</span>
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-white font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed state */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23]/95 backdrop-blur-lg border border-white/20 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: sidebarCollapsed ? 1.1 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center" : "gap-3"
                  } px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 group relative`}
                >
                  <span className="text-xl">🚪</span>
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-red-400 font-medium"
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23]/95 backdrop-blur-lg border border-white/20 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      Logout
                    </div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Social Links - Only show when expanded */}
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-4 border-t border-white/10"
                >
                  <div className="flex items-center justify-center gap-3">
                    {["twitter", "telegram", "discord"].map((social) => (
                      <motion.button
                        key={social}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="text-lg">
                          {social === "twitter" && "𝕏"}
                          {social === "telegram" && "✈️"}
                          {social === "discord" && "💬"}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      </div>

      {/* MOBILE SIDEBAR - Keep existing mobile sidebar code */}
      <div className="lg:hidden">
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMobileSidebar}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isMobileSidebarOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0A0B0D]/95 to-[#141519]/95 backdrop-blur-xl border-r border-white/10 z-50"
        >
          <div className="overflow-y-auto h-full custom-scrollbar pb-20">
            {/* Main Menu */}
            <div className="p-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Main Menu
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-white font-medium">
                              {item.label}
                            </span>
                          </div>
                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            className="w-4 h-4 text-gray-400 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mr-0 mt-1 overflow-hidden"
                            >
                              <div className="p-2 space-y-1 bg-black/40 backdrop-blur-md rounded-xl">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${
                                      location.pathname === subItem.path
                                        ? "bg-white/10 border-l-2 border-purple-500"
                                        : ""
                                    }`}
                                    onClick={closeMobileSidebar}
                                  >
                                    <span className="text-lg opacity-70">
                                      {subItem.icon}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            : ""
                        }`}
                        onClick={closeMobileSidebar}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                        <span className="text-xl relative z-10">
                          {item.icon}
                        </span>
                        <span className="text-white font-medium relative z-10">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Account Menu */}
            <div className="p-4 border-t border-white/10">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        : ""
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="text-xl opacity-80">{item.icon}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </Link>
                ))}

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300">
                  <span className="text-xl">🚪</span>
                  <span className="text-red-400 font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wallet Settings Modal */}
      <WalletSettingsModal
        isOpen={walletSettingsOpen}
        onClose={() => setWalletSettingsOpen(false)}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #f43f5e);
        }
      `}</style>
    </>
  );
};

export default Header;
