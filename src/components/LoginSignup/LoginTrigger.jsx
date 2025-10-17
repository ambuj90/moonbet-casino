// ============================================
// FILE: src/components/LoginSignup/LoginTrigger.jsx
// Enhanced: Login + Profile Dropdown UI
// ============================================

import { useState, useEffect, useRef } from "react";
import LoginSignup from "./LoginSignup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginTrigger = ({
  buttonText = "Login",
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Check login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle login success
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("token", userData?.token || "true");
    localStorage.setItem("userid", userData?.user?._id);
    // localStorage.setItem("user", JSON.stringify(userData?.user?._id || {}));
    setIsLoggedIn(true);
    handleCloseModal();
    if (onLoginSuccess) onLoginSuccess(userData);
  };

  const handleSignupSuccess = (userData) => {
    localStorage.setItem("token", userData?.token || "true");
    localStorage.setItem("user", JSON.stringify(userData?.user || {}));
    setIsLoggedIn(true);
    handleCloseModal();
    if (onSignupSuccess) onSignupSuccess(userData);
  };

  const handleLogout = () => {
    // Remove tokens
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");

    // Update state
    setIsLoggedIn(false);
    setDropdownOpen(false);

    // ✅ Show logout success toast
    toast.info("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleOpenModal = () => {
    setActiveTab(defaultTab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ Logged-in state UI
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initials = user.username
      ? user.username.charAt(0).toUpperCase()
      : "U";

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile Avatar Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`${className} flex items-center justify-center w-9 h-9 rounded-full bg-[#20263a] hover:bg-[#2a324a] transition-all text-white`}
        >
          <img src="/vite.svg" alt="User" className="w-5 h-5 opacity-90" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-3 w-56 bg-[#1b2132] border border-white/10 rounded-xl shadow-2xl py-2 z-[9999]"
            style={{ backdropFilter: "blur(16px)" }}
          >
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img src="/vite.svg" alt="" className="w-4 h-4" />
              <span>Profile</span>
            </Link>

            <Link
              to="/bets"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img src="/vite.svg" alt="" className="w-4 h-4" />
              <span>Bets</span>
            </Link>

            <Link
              to="/transactions"
              className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-all"
            >
              <img src="/vite.svg" alt="" className="w-4 h-4" />
              <span>Transactions</span>
            </Link>

            <div className="border-t border-white/10 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all"
            >
              <img src="/vite.svg" alt="" className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // ✅ Default login state UI
  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${className} cursor-pointer z-[9999]`}
        style={{ pointerEvents: "auto" }}
      >
        {buttonText}
      </button>

      <LoginSignup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTab={activeTab}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default LoginTrigger;
