// src/components/layouts/Header.jsx - Fixed Desktop and Mobile Sidebar Issues
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletSettingsModal from "../WalletSettingsModal";
import WalletModal from "../WalletModal";
import LoginTrigger from "../LoginSignup/LoginTrigger";

const Header = ({
  onMobileSidebarToggle,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [walletSettingsOpen, setWalletSettingsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const location = useLocation();
  const walletDropdownRef = useRef(null);

  // Add currencies data
  const currencies = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: "0.00000000",
      icon: "₿",
      color: "bg-orange-400",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "0.00000000",
      icon: "Ξ",
      color: "bg-blue-500",
    },
    {
      symbol: "LTC",
      name: "Litecoin",
      balance: "0.00000000",
      icon: "Ł",
      color: "bg-blue-800",
    },
    {
      symbol: "USDT",
      name: "Tether",
      balance: "0.00000000",
      icon: "₮",
      color: "bg-green-500",
    },
    {
      symbol: "SOL",
      name: "Solana",
      balance: "0.00000000",
      icon: "◎",
      color: "bg-purple-500",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      balance: "0.00000000",
      icon: "Ð",
      color: "bg-yellow-500",
    },
    {
      symbol: "BCH",
      name: "Bitcoin Cash",
      balance: "0.00000000",
      icon: "฿",
      color: "bg-green-400",
    },
    {
      symbol: "XRP",
      name: "Ripple",
      balance: "0.00000000",
      icon: "✕",
      color: "bg-gray-600",
    },
    {
      symbol: "TRX",
      name: "Tron",
      balance: "0.00000000",
      icon: "⟠",
      color: "bg-red-500",
    },
  ];

  // Menu items with submenus
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <img
          src="/icons/home.svg"
          alt="Home"
          className="w-6 h-6 object-contain"
        />
      ),
      path: "/",
    },
    {
      id: "games",
      label: "Games",
      icon: "🎮",
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
      submenu: [
        { path: "/casino/slots", label: "Slots", icon: "🎰" },
        { path: "/casino/blackjack", label: "Blackjack", icon: "♠️" },
        { path: "/casino/roulette", label: "Roulette", icon: "🎯" },
        { path: "/casino/poker", label: "Poker", icon: "🃏" },
        { path: "/casino/baccarat", label: "Baccarat", icon: "👑" },
      ],
    },
    { id: "promotions", label: "Promotions", icon: "🎁", path: "/promotions" },
    { id: "vip", label: "VIP Club", icon: "💎", path: "/vip" },
    { id: "chat", label: "Live Chat", icon: "💬", path: "/chat" },
  ];

  const accountItems = [
    { path: "/profile", label: "My Profile", icon: "👤" },
    { path: "/wallet", label: "Wallet", icon: "💳" },
    { path: "/bet-history", label: "Bet History", icon: "📊" },
    { path: "/transactions", label: "Transactions", icon: "💸" },
    { path: "/bonuses", label: "My Bonuses", icon: "🎁" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

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

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuId) => {
    if (!sidebarCollapsed) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  // Handle mobile sidebar close
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

  // Close sidebar when route changes (desktop only)
  useEffect(() => {
    if (!sidebarCollapsed) {
      closeSidebar();
    }
    // Also close mobile sidebar
    closeMobileSidebar();
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open (full mode only)
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
      <style jsx>{`
        .menu-item-gradient {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.3) 100%
          );
          box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f07730, #efd28e);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #efd28e, #f07730);
        }

        .tooltip {
          position: absolute;
          left: 100%;
          margin-left: 10px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          z-index: 100;
        }

        .tooltip-trigger:hover .tooltip {
          opacity: 1;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wallet-dropdown {
          animation: slideDown 0.3s ease-out;
        }

        .wallet-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .wallet-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .wallet-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .wallet-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left Section - Desktop Hamburger and Logo */}
          <div className="flex items-center gap-4">
            {/* Desktop Hamburger Menu Button - Hidden on Mobile */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors relative"
            >
              <svg
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  sidebarOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full animate-pulse"></span>
            </button>

            {/* Logo */}
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
                  src="/icons/sol.svg"
                  alt="Solana"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />

                {/* Balance text */}
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
                  0.00000
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
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 
                       rounded-lg focus:outline-none focus:border-green-500/50 
                       text-xs sm:text-sm text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 sm:max-h-80 overflow-y-auto wallet-scrollbar">
                    {currencies.map((currency) => (
                      <div
                        key={currency.symbol}
                        className="flex items-center justify-between p-2 sm:p-3 hover:bg-white/5 
                       cursor-pointer transition-all"
                        onClick={() => setWalletDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${currency.color} 
                            flex items-center justify-center text-white text-xs sm:text-sm font-bold`}
                          >
                            {currency.icon}
                          </div>
                          <span className="text-white font-medium text-xs sm:text-sm">
                            {currency.symbol}
                          </span>
                        </div>
                        <span className="text-gray-400 font-mono text-xs sm:text-sm">
                          {currency.balance}
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
      </header>

      {/* DESKTOP SIDEBAR - Hidden on Mobile */}
      {!sidebarCollapsed && (
        <div
          className={`hidden lg:block fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed left-0 top-0 h-full bg-gradient-to-b from-[#0A0B0D] to-[#141519] border-r border-white/10 z-50 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-50"
        } ${
          sidebarOpen || sidebarCollapsed
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
                  <img
                    src="/icons/logo.svg"
                    alt="Moonbet Logo"
                    className="w-30 h-30 object-contain"
                  />
                </span>
              </Link>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="w-full flex justify-center">
              <Link to="/" className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
                  <img
                    src="/home-assets/mobile-logo.svg"
                    alt="Moonbet Logo"
                    className="w-30 h-30 object-contain"
                  />
                </span>
              </Link>
            </div>
          )}

          {!sidebarCollapsed && (
            <button
              onClick={toggleCollapse}
              className="p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110"
              title="Collapse sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Expand Button (when collapsed) */}
        {sidebarCollapsed && (
          <div className="p-4 border-b border-white/10 flex justify-center">
            <button
              onClick={toggleCollapse}
              className="p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110"
              title="Expand sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Scrollable Menu */}
        <div
          className={`overflow-y-auto custom-scrollbar ${
            sidebarCollapsed ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-280px)]"
          }`}
        >
          {/* Main Menu */}
          <div className="p-4">
            {!sidebarCollapsed && (
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Main Menu
              </h3>
            )}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`w-full flex items-center ${
                          sidebarCollapsed
                            ? "justify-center"
                            : "justify-between"
                        } px-3 py-2.5 transition-all hover:menu-item-gradient tooltip-trigger relative ${
                          activeSubmenu === item.id ? "menu-item-gradient" : ""
                        }`}
                        style={{ borderRadius: "8px" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          {!sidebarCollapsed && (
                            <span className="text-white font-medium">
                              {item.label}
                            </span>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              activeSubmenu === item.id ? "rotate-180" : ""
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
                        )}
                        {sidebarCollapsed && (
                          <span className="tooltip">{item.label}</span>
                        )}
                      </button>

                      {/* Submenu - only show when not collapsed */}
                      {!sidebarCollapsed && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            activeSubmenu === item.id ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div
                            className="ml-4 mr-0 mt-1 p-2 space-y-1"
                            style={{
                              background: "rgba(0, 0, 0, 0.80)",
                              boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.25)",
                              backdropFilter: "blur(2px)",
                              borderRadius: "8px",
                            }}
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${
                                  location.pathname === subItem.path
                                    ? "bg-white/10 border-l-2 border-[#F07730]"
                                    : ""
                                }`}
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
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : ""
                      } gap-3 px-3 py-2.5 transition-all hover:menu-item-gradient tooltip-trigger relative ${
                        location.pathname === item.path
                          ? "menu-item-gradient"
                          : ""
                      }`}
                      style={{ borderRadius: "8px" }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="text-white font-medium">
                          {item.label}
                        </span>
                      )}
                      {sidebarCollapsed && (
                        <span className="tooltip">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Account Menu */}
          <div className="p-4 border-t border-white/10">
            {!sidebarCollapsed && (
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
            )}
            <div className="space-y-1">
              {accountItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${
                    sidebarCollapsed ? "justify-center" : ""
                  } gap-3 px-3 py-2.5 transition-all hover:menu-item-gradient tooltip-trigger relative ${
                    location.pathname === item.path ? "menu-item-gradient" : ""
                  }`}
                  style={{ borderRadius: "8px" }}
                >
                  <span className="text-xl opacity-80">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                  {sidebarCollapsed && (
                    <span className="tooltip">{item.label}</span>
                  )}
                </Link>
              ))}

              <button
                className={`w-full flex items-center ${
                  sidebarCollapsed ? "justify-center" : ""
                } gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 transition-all tooltip-trigger relative`}
                style={{ borderRadius: "8px" }}
              >
                <span className="text-xl">🚪</span>
                {!sidebarCollapsed && (
                  <span className="text-red-400 font-medium">Logout</span>
                )}
                {sidebarCollapsed && <span className="tooltip">Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center justify-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE SIDEBAR - Only shows on mobile */}
      <div className="lg:hidden">
        {/* Mobile Backdrop */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0A0B0D] to-[#141519] border-r border-white/10 z-50 transform transition-transform duration-300 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
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
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 transition-all hover:menu-item-gradient ${
                            activeSubmenu === item.id
                              ? "menu-item-gradient"
                              : ""
                          }`}
                          style={{ borderRadius: "8px" }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-white font-medium">
                              {item.label}
                            </span>
                          </div>
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              activeSubmenu === item.id ? "rotate-180" : ""
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

                        {/* Submenu */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            activeSubmenu === item.id ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div
                            className="ml-4 mr-0 mt-1 p-2 space-y-1"
                            style={{
                              background: "rgba(0, 0, 0, 0.80)",
                              boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.25)",
                              backdropFilter: "blur(2px)",
                              borderRadius: "8px",
                            }}
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${
                                  location.pathname === subItem.path
                                    ? "bg-white/10 border-l-2 border-[#F07730]"
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
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 transition-all hover:menu-item-gradient ${
                          location.pathname === item.path
                            ? "menu-item-gradient"
                            : ""
                        }`}
                        style={{ borderRadius: "8px" }}
                        onClick={closeMobileSidebar}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white font-medium">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Menu */}
            <div className="p-4 border-t border-white/10">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-all hover:menu-item-gradient ${
                      location.pathname === item.path
                        ? "menu-item-gradient"
                        : ""
                    }`}
                    style={{ borderRadius: "8px" }}
                    onClick={closeMobileSidebar}
                  >
                    <span className="text-xl opacity-80">{item.icon}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </Link>
                ))}

                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 transition-all"
                  style={{ borderRadius: "8px" }}
                >
                  <span className="text-xl">🚪</span>
                  <span className="text-red-400 font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default Header;
