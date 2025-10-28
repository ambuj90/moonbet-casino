// src/components/WalletSettingsModal.jsx
import React, { useState, useEffect } from "react";

const WalletSettingsModal = ({ isOpen, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Currency options with their flags/icons
  const currencies = [
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", color: "bg-red-500" },
    { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", color: "bg-green-500" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", color: "bg-red-500" },
    { code: "EUR", name: "Euro", flag: "🇪🇺", color: "bg-blue-500" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", color: "bg-blue-600" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸", color: "bg-yellow-500" },
  ];

  // Prevent body scroll when modal is open
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div
          className="bg-[#2A2D3A] rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Wallet Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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

          {/* Content */}
          <div className="p-6">
            {/* Currency Section */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm font-medium mb-4">
                Currency
              </h3>

              {/* Currency Grid */}
              <div className="grid grid-cols-3 gap-4">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                    className={`
                      relative flex items-center gap-3 p-3 rounded-xl
                      transition-all duration-200
                      ${
                        selectedCurrency === currency.code
                          ? "bg-white/10 border-2 border-blue-500"
                          : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                      }
                    `}
                  >
                    {/* Radio Circle */}
                    <div className="relative">
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2
                        ${
                          selectedCurrency === currency.code
                            ? "border-blue-500"
                            : "border-gray-500"
                        }
                      `}
                      >
                        {selectedCurrency === currency.code && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Currency Info */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`
                        w-7 h-7 rounded-full ${currency.color} 
                        flex items-center justify-center text-white text-xs font-bold
                      `}
                      >
                        {currency.flag}
                      </div>
                      <span className="text-white font-medium">
                        {currency.code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-orange-200 text-sm leading-relaxed">
                  By switching currencies, your balance will be fully converted
                  to the selected currency using current exchange rates.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle currency change
                  console.log("Currency changed to:", selectedCurrency);
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-content {
          animation: modalSlideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default WalletSettingsModal;
