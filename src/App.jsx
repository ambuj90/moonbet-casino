// src/App.jsx - SIMPLE FIX FOR CLOSE BUTTON

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Bets from "./pages/Bets";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import GamePage from "./pages/GamePage";
import { ToastContainer, toast } from "react-toastify";
import "./styles/toastify-custom.css"; // Your custom styles

// Placeholder pages
const HoneypotPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Honeypot Game</h1>
  </div>
);

const CoinflipPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Coinflip Game</h1>
  </div>
);

const PumpDumpPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Pump.Dump Game</h1>
  </div>
);

const FuturesPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Futures Game</h1>
  </div>
);

const ChatPage = () => (
  <div className="min-h-screen p-8 text-white">
    <h1>Chat</h1>
  </div>
);

// Auth Modal Handler Component
const AuthModalHandler = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    const tabParam = searchParams.get("tab");

    if (modalParam === "auth" && !isLoggedIn) {
      setIsAuthModalOpen(true);
      setDefaultTab(tabParam === "register" ? "register" : "login");
    } else {
      setIsAuthModalOpen(false);
    }
  }, [searchParams, isLoggedIn]);

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    searchParams.delete("modal");
    searchParams.delete("tab");
    setSearchParams(searchParams);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseAuthModal();
  };

  return (
    <>
      {children}
      {!isLoggedIn && (
        <LoginSignup
          isOpen={isAuthModalOpen}
          onClose={handleCloseAuthModal}
          defaultTab={defaultTab}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

function App() {
  useEffect(() => {
    // You can remove this after testing
    const timer = setTimeout(() => {
      toast.info("Welcome to MoonBet Casino!", {
        autoClose: 5000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Router>
      <AuthModalHandler>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="game/honeypot" element={<HoneypotPage />} />
            <Route path="game/coinflip" element={<CoinflipPage />} />
            <Route path="game/pumpdump" element={<PumpDumpPage />} />
            <Route path="game/futures" element={<FuturesPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="bets" element={<Bets />} />
            <Route path="bet-history" element={<Bets />} />
            <Route path="game/:gameId" element={<GamePage />} />
          </Route>
        </Routes>
      </AuthModalHandler>

      {/* ✅ SIMPLIFIED TOAST CONTAINER - DISABLE closeOnClick */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true} // ← Changed from false to true
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        closeButton={true}
      />
    </Router>
  );
}

export default App;
