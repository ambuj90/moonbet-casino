// src/components/sections/HomeFAQSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeFAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is Moonbet Legit?",
      answer:
        "Yes, Moonbet is a fully legitimate decentralized casino operating on the Solana blockchain. All games are provably fair with transparent smart contracts that can be verified on-chain.",
    },
    {
      question: "Are Moonbet Games Licensed?",
      answer:
        "Moonbet operates as a decentralized platform on the blockchain. While traditional licensing doesn't apply to DeFi protocols, all our games use verified smart contracts and provably fair algorithms that ensure transparency and fairness.",
    },
    {
      question: "States/Countries Where Moonbet Is Legal?",
      answer:
        "As a decentralized platform, Moonbet is accessible globally wherever cryptocurrency transactions are permitted. Users are responsible for complying with their local regulations regarding online gaming and cryptocurrency use.",
    },
    {
      question: "Tips And Tricks For Moonbet Players?",
      answer:
        "Start with small bets to understand game mechanics. Take advantage of daily rewards and bonuses. Set limits for yourself and never bet more than you can afford to lose. Join our community for strategies and updates.",
    },
    {
      question: "What Payment Methods Does Moonbet Accept?",
      answer:
        "Pure Crypto Only. Solana (SOL), Bitcoin, Ethereum, And All Major Tokens. Connect With Phantom, Metamask, Or Any Web3 Wallet You Like. No Fiat, Banks, Or Traditional Payment Headaches. Crypto In, Crypto Out, Instant Everything.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-[#0A0B0D]">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-2xl lg:text-2xl font-bold">
            <span className="bg-gradient-to-r  ">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/[0.08] transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center group"
              >
                <h3 className="text-base md:text-lg font-semibold text-white pr-4">
                  {index + 1}. {faq.question}
                </h3>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-2xl text-[#F07730] group-hover:text-[#EFD28E] transition-colors"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm md:text-base text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        ></motion.div>
      </div>
    </section>
  );
};

export default HomeFAQSection;
