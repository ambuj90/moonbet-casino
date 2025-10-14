// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Bets from "./pages/Bets";

// Placeholder pages - create these later
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

function App() {
  return (
    <Router>
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
