// src/components/LoginSignup/LoginSignup.jsx - Updated with Forgot Password
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icon Components
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

const LoginSignup = ({
  isOpen,
  onClose,
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  onForgotPasswordSuccess,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  // Form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = () => {
    console.log("Login:", loginData);
    if (onLoginSuccess) onLoginSuccess(loginData);
  };

  const handleSignupSubmit = () => {
    console.log("Signup:", signupData);
    if (onSignupSuccess) onSignupSuccess(signupData);
  };

  const handleForgotPasswordSubmit = () => {
    console.log("Forgot Password:", forgotPasswordData);
    setRecoverySent(true);
    if (onForgotPasswordSuccess) onForgotPasswordSuccess(forgotPasswordData);
  };

  const handleBackToLogin = () => {
    setActiveTab("login");
    setRecoverySent(false);
    setForgotPasswordData({ email: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] p-4 h-screen"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.90)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      {/* Centering wrapper */}
      <div className="flex items-center justify-center min-h-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-[900px] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1a1d24 0%, #0f1014 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 100px rgba(240, 119, 48, 0.15)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
          >
            <svg
              className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Banner */}
            <div className="hidden lg:flex lg:w-[40%] relative bg-gradient-to-br from-[#F07730] via-[#D66920] to-[#B85515] p-8 lg:p-10">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-6">
                    <div className="h-10 flex items-center">
                      <span className="text-3xl font-bold text-white">
                        MOONBET
                      </span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Welcome to MoonBet
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Join thousands of players in the ultimate crypto casino
                    experience. Win big, play fair, stay secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Provably Fair
                      </div>
                      <div className="text-white/70 text-xs">
                        Transparent & Verifiable
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Instant Withdrawals
                      </div>
                      <div className="text-white/70 text-xs">
                        Crypto Payments Only
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white font-semibold text-sm">
                        2,341 Players Online
                      </span>
                    </div>
                    <div className="text-white/70 text-xs">
                      Must be 18+ to play
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-[60%] p-6 sm:p-8 lg:p-10 max-h-[85vh] overflow-y-auto">
              {/* Tabs - Hide when on forgot password */}
              {activeTab !== "forgot" && (
                <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === "login"
                        ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === "register"
                        ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Content */}
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Welcome Back
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Sign in to continue playing
                      </p>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        <GoogleIcon />
                        <span className="text-white text-sm font-medium">
                          Google
                        </span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        <WalletIcon />
                        <span className="text-white text-sm font-medium">
                          Wallet
                        </span>
                      </button>
                    </div>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 text-xs text-gray-500 bg-[#1a1d24]">
                          or with email
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                        />
                      </div>

                      <div>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setActiveTab("forgot")}
                          className="text-sm text-[#F07730] hover:text-[#EFD28E] transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        onClick={handleLoginSubmit}
                        className="w-full py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-bold hover:shadow-lg hover:shadow-[#F07730]/30 transition-all"
                      >
                        Sign In
                      </button>
                    </div>

                    <div className="mt-6 text-center">
                      <span className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                      </span>
                      <button
                        onClick={() => setActiveTab("register")}
                        className="text-[#F07730] hover:text-[#EFD28E] font-semibold text-sm"
                      >
                        Sign up
                      </button>
                    </div>
                  </motion.div>
                ) : activeTab === "register" ? (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Create Account
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Join the winning team
                      </p>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        <GoogleIcon />
                        <span className="text-white text-sm font-medium">
                          Google
                        </span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        <WalletIcon />
                        <span className="text-white text-sm font-medium">
                          Wallet
                        </span>
                      </button>
                    </div>

                    {/* Referral Code */}
                    <button
                      onClick={() => setShowReferralCode(!showReferralCode)}
                      className="w-full flex items-center justify-between py-2.5 px-4 mb-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                    >
                      <span className="text-gray-300 text-sm">
                        Have a referral code?
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          showReferralCode ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {showReferralCode && (
                      <div className="mb-4">
                        <input
                          type="text"
                          name="referralCode"
                          placeholder="Enter referral code"
                          value={signupData.referralCode}
                          onChange={handleSignupChange}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                        />
                      </div>
                    )}

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 text-xs text-gray-500 bg-[#1a1d24]">
                          or with email
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                      />

                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={signupData.username}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                      />

                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                      />

                      <div className="space-y-2 pt-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={signupData.agreeTerms}
                            onChange={handleSignupChange}
                            className="mt-0.5 w-4 h-4 rounded bg-white/5 border-white/20 cursor-pointer accent-[#F07730]"
                          />
                          <span className="text-xs text-gray-300">
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-[#F07730] hover:underline"
                            >
                              Terms
                            </a>{" "}
                            and confirm I'm 18+
                          </span>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="agreeMarketing"
                            checked={signupData.agreeMarketing}
                            onChange={handleSignupChange}
                            className="mt-0.5 w-4 h-4 rounded bg-white/5 border-white/20 cursor-pointer accent-[#F07730]"
                          />
                          <span className="text-xs text-gray-300">
                            Send me promotions
                          </span>
                        </label>
                      </div>

                      <button
                        onClick={handleSignupSubmit}
                        className="w-full py-3 mt-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-bold hover:shadow-lg hover:shadow-[#F07730]/30 transition-all"
                      >
                        Create Account
                      </button>
                    </div>

                    <div className="mt-6 text-center">
                      <span className="text-gray-400 text-sm">
                        Already have an account?{" "}
                      </span>
                      <button
                        onClick={() => setActiveTab("login")}
                        className="text-[#F07730] hover:text-[#EFD28E] font-semibold text-sm"
                      >
                        Sign in
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // Forgot Password Form
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Recover Account
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {recoverySent
                          ? "Check your email for recovery instructions"
                          : "Enter your email to reset your password"}
                      </p>
                    </div>

                    {!recoverySent ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">
                              Username or Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter your email address"
                              value={forgotPasswordData.email}
                              onChange={handleForgotPasswordChange}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all"
                            />
                          </div>

                          <button
                            onClick={handleForgotPasswordSubmit}
                            className="w-full py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-bold hover:shadow-lg hover:shadow-[#F07730]/30 transition-all"
                          >
                            Recover Account
                          </button>
                        </div>

                        <div className="mt-6 text-center">
                          <button
                            onClick={handleBackToLogin}
                            className="text-sm text-[#F07730] hover:text-[#EFD28E] transition-colors"
                          >
                            Return to Login
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Success State */}
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                              >
                                <path
                                  d="M5 13l4 4L19 7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-green-400 font-semibold mb-1">
                                Success!
                              </div>
                              <div className="text-sm text-gray-300">
                                Password recovery email has been sent to{" "}
                                {forgotPasswordData.email}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-400">
                          <p>Please check your email inbox and spam folder.</p>
                          <p>The recovery link will expire in 24 hours.</p>
                        </div>

                        <button
                          onClick={handleBackToLogin}
                          className="w-full py-3 mt-6 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-bold hover:shadow-lg hover:shadow-[#F07730]/30 transition-all"
                        >
                          Return to Login
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;
