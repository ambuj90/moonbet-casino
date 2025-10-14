// src/components/WalletModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";

const WalletModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositTab, setDepositTab] = useState("crypto");
  const [qrCodeData, setQrCodeData] = useState("");
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [displayCryptoInFiat, setDisplayCryptoInFiat] = useState(true);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("USD");
  const [buyAmount, setBuyAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const walletAddress = "Ar64QrBWTHWncHKXv2ojJ2np1zAGTEhZUA8wfdhTg7n";

  useEffect(() => {
    if (walletAddress) {
      QRCode.toDataURL(walletAddress, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then(setQrCodeData)
        .catch(console.error);
    }
  }, [walletAddress]);

  const cryptoCurrencies = [
    {
      symbol: "SOL",
      name: "Solana",
      icon: "◎",
      balance: "0.10009677",
      value: "$19.58",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      icon: "₿",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: "Ξ",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "USDT",
      name: "Tether",
      icon: "₮",
      balance: "0.00000000",
      value: "$0.00",
    },
  ];

  const fiatCurrencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "JPY", symbol: "¥" },
    { code: "INR", symbol: "₹" },
    { code: "CAD", symbol: "$" },
    { code: "CNY", symbol: "¥" },
    { code: "IDR", symbol: "Rp" },
    { code: "KRW", symbol: "₩" },
    { code: "PHP", symbol: "₱" },
    { code: "RUB", symbol: "₽" },
    { code: "DKK", symbol: "Kr" },
    { code: "MXN", symbol: "$" },
    { code: "PLN", symbol: "zł" },
    { code: "TRY", symbol: "₺" },
    { code: "VND", symbol: "đ" },
    { code: "ARS", symbol: "ARS" },
    { code: "PEN", symbol: "S/" },
    { code: "CLP", symbol: "CLP" },
    { code: "NGN", symbol: "₦" },
    { code: "CRC", symbol: "₡" },
    { code: "MAD", symbol: "MAD" },
    { code: "MYR", symbol: "RM" },
    { code: "QAR", symbol: "ر.ق" },
    { code: "SAR", symbol: "﷼" },
  ];

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const renderDepositModal = () => (
    <AnimatePresence>
      {showDepositModal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
            onClick={() => setShowDepositModal(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[103] p-4"
          >
            <div className="bg-[#1A1D24] rounded-xl w-full max-w-lg shadow-2xl border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Deposit</h2>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-6">
                <button
                  onClick={() => setDepositTab("crypto")}
                  className={`flex-1 py-3 px-4 rounded-full font-medium transition-all ${
                    depositTab === "crypto"
                      ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  Crypto
                </button>
                <button
                  onClick={() => setDepositTab("local")}
                  className={`flex-1 py-3 px-4 rounded-full font-medium transition-all ${
                    depositTab === "local"
                      ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  Local Currency
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Currency
                  </label>
                  <div className="bg-[#0F1116] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                        ◎
                      </div>
                      <div>
                        <div className="text-white font-bold">SOL</div>
                        <div className="text-gray-400 text-sm">Solana</div>
                      </div>
                    </div>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Address
                  </label>
                  <div className="bg-[#0F1116] rounded-lg p-4 flex items-center gap-3 border border-white/10">
                    <span className="text-white text-sm font-mono flex-1 truncate">
                      {walletAddress}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg transition-all ${
                        copied
                          ? "bg-green-500/20 text-green-400"
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      {copied ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
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
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-xl">
                    {qrCodeData && (
                      <img
                        src={qrCodeData}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    )}
                  </div>
                </div>

                <div className="text-center text-gray-400 mb-4">Or</div>

                <button className="w-full bg-[#0F1116] hover:bg-white/5 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all border border-white/10">
                  <span>Deposit Directly From Your Wallet</span>
                  <div className="flex gap-2">
                    <span className="text-xl">🦊</span>
                    <span className="text-xl">👻</span>
                    <span className="text-xl">🔵</span>
                    <span className="text-xl">◎</span>
                    <span className="text-sm bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black px-2 py-1 rounded font-bold">
                      +300
                    </span>
                  </div>
                </button>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-gray-400">Credited</span>
                  <span className="text-white">2 Confirmations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="bg-[#1A1D24] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Wallet</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 p-6 border-b border-white/10 bg-[#0F1116]">
                {["overview", "buycrypto", "settings"].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black"
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "overview"
                      ? "Overview"
                      : tab === "buycrypto"
                      ? "Buy Crypto"
                      : "Settings"}
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 200px)" }}
              >
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-gray-400 text-sm mb-2">Balance</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-white">
                          $19.58
                        </span>
                        <div className="w-8 h-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold text-sm">
                          $
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-gray-400 text-sm mb-4 pb-2 border-b border-white/10">
                        <span>Currency</span>
                        <span>Value</span>
                      </div>

                      {cryptoCurrencies.map((crypto, index) => (
                        <motion.div
                          key={crypto.symbol}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 transition-all px-2 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                              {crypto.icon}
                            </div>
                            <div>
                              <div className="text-white font-bold">
                                {crypto.symbol}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {crypto.name}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">
                              {crypto.balance}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {crypto.value} USD
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/5 hover:bg-white/10 text-white py-4 px-6 rounded-lg font-bold transition-all border border-white/10"
                      >
                        Withdraw
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDepositModal(true)}
                        className="bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all"
                      >
                        Deposit
                      </motion.button>
                    </div>

                    <div className="bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10 border border-[#F07730]/30 rounded-lg p-4">
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Buy Crypto Tab */}
                {activeTab === "buycrypto" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="mb-4">
                      <label className="text-gray-400 text-sm mb-2 block">
                        Buy
                      </label>
                      <div className="bg-[#0F1116] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold">
                            ◎
                          </div>
                          <div>
                            <div className="text-white font-bold">SOL</div>
                            <div className="text-gray-400 text-sm">Solana</div>
                          </div>
                        </div>
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-gray-400 text-sm mb-2 block">
                        Amount *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-[#0F1116] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07730] border border-white/10"
                        />
                        <div className="bg-[#0F1116] rounded-lg px-4 py-3 flex items-center gap-2 min-w-[120px] border border-white/10">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs font-bold">
                            ₹
                          </div>
                          <span className="text-white font-medium">INR</span>
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all"
                    >
                      Buy
                    </motion.button>

                    <div className="mt-6 bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10 border border-[#F07730]/30 rounded-lg p-4">
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            Hide Zero Balances
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Your zero balances won't appear in your wallet
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={hideZeroBalances}
                            onChange={(e) =>
                              setHideZeroBalances(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            Display Crypto in Fiat
                          </h4>
                          <p className="text-gray-400 text-sm">
                            All bets & transactions will be settled in the
                            crypto equivalent
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={displayCryptoInFiat}
                            onChange={(e) =>
                              setDisplayCryptoInFiat(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {fiatCurrencies.map((currency) => (
                        <motion.button
                          key={currency.code}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFiatCurrency(currency.code)}
                          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                            selectedFiatCurrency === currency.code
                              ? "bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 border-2 border-[#F07730]"
                              : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                          }`}
                        >
                          <div className="relative">
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                selectedFiatCurrency === currency.code
                                  ? "border-[#F07730]"
                                  : "border-gray-500"
                              }`}
                            >
                              {selectedFiatCurrency === currency.code && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#F07730] to-[#EFD28E]"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {currency.code}
                          </span>
                          <div className="w-5 h-5 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs">
                            {currency.symbol}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#F07730]/10 to-[#EFD28E]/10 border border-[#F07730]/30 rounded-lg p-4">
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {renderDepositModal()}
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
