// src/components/settings/SecuritySection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const SecuritySection = ({ emailVerified, enable2FA, setEnable2FA }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [is2FAUpdating, setIs2FAUpdating] = useState(false);

  // Handle 2FA toggle with API call
  const handle2FAToggle = async () => {
    // Optimistically update UI immediately
    setEnable2FA(!enable2FA);
    setIs2FAUpdating(true);

    try {
      // Simulate API call (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // If you have an API call, do it here:
      // await fetch('/api/settings/2fa', {
      //   method: 'PUT',
      //   body: JSON.stringify({ enabled: !enable2FA })
      // });
    } catch (error) {
      // If API call fails, revert the change
      setEnable2FA(enable2FA);
      console.error("Failed to update 2FA setting:", error);
    } finally {
      setIs2FAUpdating(false);
    }
  };

  // Toggle Switch Component with loading state
  const ToggleSwitch = ({
    enabled,
    onChange,
    disabled = false,
    isLoading = false,
  }) => (
    <button
      onClick={onChange}
      disabled={disabled || isLoading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
        enabled ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E]" : "bg-gray-600"
      } ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      {isLoading ? (
        <svg
          className="absolute inset-0 m-auto w-4 h-4 text-white animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      )}
    </button>
  );

  const handleSendVerification = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Verification email sent!");
    }, 1000);
  };

  const handleUpdatePassword = () => {
    // Navigate to password update page or open modal
    console.log("Update password clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Security</h2>
      </div>

      <div className="space-y-4">
        {/* Verify Email */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Verify Email</h3>
              {emailVerified ? (
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                  Verified
                </span>
              ) : (
                <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded animate-pulse">
                  Not Verified
                </span>
              )}
            </div>
            {!emailVerified && (
              <button
                onClick={handleSendVerification}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Verification"
                )}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Increase your account security by verifying your email
          </p>
        </div>

        {/* Update Password */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Update Password</h3>
            </div>
            <button
              onClick={handleUpdatePassword}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-all text-sm whitespace-nowrap"
            >
              Update Password
            </button>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Update your password to improve account security
          </p>
        </div>

        {/* Enable 2FA */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Enable 2FA</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Two-Factor Authentication helps secure your account from
                unauthorized access
              </p>
            </div>
            <ToggleSwitch enabled={enable2FA} onChange={setEnable2FA} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecuritySection;
