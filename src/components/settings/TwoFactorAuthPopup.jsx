// src/components/settings/TwoFactorAuthPopup.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const TwoFactorAuthPopup = ({
  isOpen,
  onClose,
  onComplete,
  userEmail = "user@example.com",
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate QR Code and Secret Key when popup opens
  useEffect(() => {
    if (isOpen) {
      generateTwoFactorData();
    }
  }, [isOpen]);

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

  // Generate 2FA data
  const generateTwoFactorData = async () => {
    try {
      // For demo purposes, generate a random secret key
      // In production, this should come from your backend
      const randomSecret = generateRandomSecret();
      setSecretKey(randomSecret);

      // Generate QR code for Google Authenticator
      // Format: otpauth://totp/AppName:user@example.com?secret=SECRETKEY&issuer=AppName
      const otpUrl = `otpauth://totp/MoonBet:${userEmail}?secret=${randomSecret}&issuer=MoonBet`;

      // Generate QR Code
      const qrDataUrl = await QRCode.toDataURL(otpUrl, {
        width: 200,
        margin: 0,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error("Error generating 2FA data:", error);
      toast.error("Failed to generate 2FA data");
    }
  };

  // Generate random secret key (for demo)
  const generateRandomSecret = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret = "";
    for (let i = 0; i < 16; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)];
    }
    return secret;
  };

  // Copy secret key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle 2FA setup completion
  const handleCompleteSetup = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      // Here you would verify the code with your backend
      // For demo, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate verification (accept any 6-digit code for demo)
      // In production, verify with backend

      toast.success("Two-Factor Authentication enabled successfully!");

      if (onComplete) {
        onComplete(true);
      }

      handleClose();
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.error("2FA setup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setVerificationCode("");
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  // Portal content
  const portalContent = (
    <>
      {/* Overlay - Fixed to cover entire viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />

      {/* Modal Container - Fixed positioning with flexbox centering */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-lg pointer-events-auto"
        >
          <div className="bg-[#1A1D29] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#1A1D29] to-[#252837] px-6 pt-6 pb-4 border-b border-white/10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-white"
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

              <h2 className="text-2xl font-bold text-white">Two Factor</h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Two Column Layout - Setup Instructions and QR Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left Column - Setup Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Setup Instructions
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Scan this QR code with an authentication app such as{" "}
                    <span className="text-blue-400">Google Authenticator</span>.
                  </p>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    If you're not able to scan, you can enter the secret key
                    instead.
                  </p>
                </div>

                {/* Right Column - QR Code */}
                <div className="flex justify-center md:justify-end">
                  <div className="bg-white p-3 rounded-lg inline-block">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="2FA QR Code"
                        className="w-40 h-40 md:w-44 md:h-44"
                      />
                    ) : (
                      <div className="w-40 h-40 md:w-44 md:h-44 bg-gray-200 animate-pulse rounded" />
                    )}
                  </div>
                </div>
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={secretKey}
                    readOnly
                    className="w-full bg-[#252837] text-white font-mono text-base px-4 py-3 pr-12 rounded-lg border border-white/10 focus:outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? (
                      <svg
                        className="w-4 h-4 text-green-400"
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
                        className="w-4 h-4 text-gray-400"
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
                  </button>
                </div>
              </div>

              {/* Verification Code Input */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Enter your 2FA code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    // Only allow numbers and limit to 6 digits
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setVerificationCode(value);
                  }}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full bg-[#252837] text-white text-lg font-mono px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all placeholder-gray-600"
                />
              </div>

              {/* Complete Setup Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompleteSetup}
                disabled={isLoading || !verificationCode}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Complete Setup"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  // Use React Portal to render at document body level
  return ReactDOM.createPortal(
    <AnimatePresence>{isOpen && portalContent}</AnimatePresence>,
    document.body
  );
};

export default TwoFactorAuthPopup;
