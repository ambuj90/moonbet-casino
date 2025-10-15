// =====================================
// FILE: src/components/Footer.jsx
// MoonBet Casino Footer - Futuristic Tailwind CSS Version
// =====================================
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BegambleawareIcon, ContactIcon } from "../ui-elements/svg-img";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0px rgba(255, 107, 0, 0)" },
    hover: {
      boxShadow: "0 0 20px rgba(255, 107, 0, 0.6)",
      transition: { duration: 0.3 },
    },
  };

  // Social icons
  const socialIcons = [
    {
      name: "Reddit",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const footerLinks = {
    aboutUs: [
      { label: "Affiliate", path: "/affiliate" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Responsible Gambling", path: "/responsible-gambling" },
      { label: "Contact Us", path: "/contact" },
    ],
    support: [
      { label: "Help Center", path: "/help" },
      { label: "Gaming Helpline", path: "/gaming-helpline" },
      { label: "Live Support", path: "/live-support" },
    ],
    moonbet: [
      { label: "Betting Rules", path: "/betting-rules" },
      { label: "Provably Fair", path: "/provably-fair" },
      { label: "RNG", path: "/rng" },
    ],
  };

  return (
    <footer className="relative w-full bg-black overflow-hidden min-h-[800px]">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="home-assets/footer-bg-2.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-100"
        />
        {/* Neon Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black/90 pointer-events-none" />
      </div>

      {/* Footer Content */}
      <motion.div
        className="relative z-10 py-8 flex flex-col min-h-[800px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-[1366px] mx-auto px-6 w-full flex flex-col h-full">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pt-5">
            {/* Brand Column */}
            <motion.div
              className="flex flex-col lg:pr-10 text-center lg:text-left items-center lg:items-start"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/icons/logo.svg"
                  alt="Wallet Icon"
                  className="w-60  object-contain"
                />
              </div>

              <p className="text-sm leading-relaxed text-white/70 max-w-[320px] mb-2">
                Moonbet operates as a decentralized crypto casino on the Solana
                blockchain. Built by crypto natives for players 18+
              </p>

              <motion.div
                className="flex items-center gap-2 mt-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg text-orange-500">✉</span>
                <a
                  href="mailto:support@moonbet.games"
                  className="text-sm text-white/80 hover:text-orange-500 transition-colors duration-300"
                >
                  support@moonbet.games
                </a>
              </motion.div>

              {/* Social Links with Neon Glow */}
              <div className="flex gap-4 mt-3">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 transition-all duration-300 hover:text-white"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Columns - Desktop: 3 columns, Mobile: horizontal scroll */}
            <div className="md:contents flex flex-row justify-center gap-8 md:gap-0">
              {/* About Us Column */}
              <motion.div
                className="flex flex-col gap-5 lg:pt-[85px] text-left min-w-[140px]"
                variants={itemVariants}
              >
                <h3 className="text-base font-semibold text-white mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  About Us
                </h3>
                <ul className="flex flex-col gap-3">
                  {footerLinks.aboutUs.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support Column */}
              <motion.div
                className="flex flex-col gap-5 lg:pt-[85px] text-left min-w-[140px]"
                variants={itemVariants}
              >
                <h3 className="text-base font-semibold text-white mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Support
                </h3>
                <ul className="flex flex-col gap-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Moonbet Column */}
              <motion.div
                className="flex flex-col gap-5 lg:pt-[85px] text-left min-w-[140px]"
                variants={itemVariants}
              >
                <h3 className="text-base font-semibold text-white mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Moonbet
                </h3>
                <ul className="flex flex-col gap-3">
                  {footerLinks.moonbet.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Spacer for astronauts */}
          <div className="flex-1 min-h-[200px] lg:min-h-[300px]" />

          {/* Bottom Section with Glassmorphism */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center py-8 gap-4  mb-20 lg:mb-0"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)",
                }}
              >
                {BegambleawareIcon}
                <span className="text-sm font-medium text-white/80 hidden sm:inline">
                  BeGambleAware
                </span>
                <span className="text-base font-bold text-orange-500">18+</span>
              </motion.div>
            </div>

            <div className="text-sm text-white/60">©MoonBet {currentYear}</div>

            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ContactIcon}
              <span className="hidden sm:inline">Contact Us</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Back to Top Button with Neon Effect */}
      <motion.button
        className="hidden lg:flex absolute top-20 right-6 items-center gap-3 text-white/90 text-base font-medium z-20"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <span>Back to top</span>
        <motion.span
          className="p-1.5 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden relative"
          whileHover={{
            boxShadow: "0 0 25px rgba(255, 107, 0, 0.6)",
            borderColor: "rgba(255, 107, 0, 0.8)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M13.7071 1.29289C13.3166 0.902369 12.6834 0.902369 12.2929 1.29289L5.92893 7.65685C5.53841 8.04738 5.53841 8.68054 5.92893 9.07107C6.31946 9.46159 6.95262 9.46159 7.34315 9.07107L13 3.41421L18.6569 9.07107C19.0474 9.46159 19.6805 9.46159 20.0711 9.07107C20.4616 8.68054 20.4616 8.04738 20.0711 7.65685L13.7071 1.29289ZM13 24L14 24L14 2L13 2L12 2L12 24L13 24Z"
              fill="white"
            />
          </svg>
        </motion.span>
      </motion.button>
    </footer>
  );
};

export default Footer;
