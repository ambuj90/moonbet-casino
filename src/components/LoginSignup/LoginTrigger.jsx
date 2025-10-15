// ============================================
// FILE: src/components/LoginSignup/LoginTrigger.jsx
// Simple Login Trigger Component - Opens LoginSignup Modal
// ============================================

import { useState } from "react";
import LoginSignup from "./LoginSignup";

/**
 * LoginTrigger - A reusable component that displays a login button
 * and triggers the LoginSignup modal
 *
 * @param {Object} props
 * @param {string|JSX.Element} props.buttonText - Text or JSX for the button (default: "Login")
 * @param {string} props.defaultTab - Default tab to show ('login' or 'register')
 * @param {Function} props.onLoginSuccess - Callback when login succeeds
 * @param {Function} props.onSignupSuccess - Callback when signup succeeds
 * @param {string} props.className - Additional CSS classes for button
 */
export const LoginTrigger = ({
  buttonText = "Login",
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Open modal
  const handleOpenModal = () => {
    setActiveTab(defaultTab);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    handleCloseModal();
    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
  };

  // Handle successful signup
  const handleSignupSuccess = (userData) => {
    handleCloseModal();
    if (onSignupSuccess) {
      onSignupSuccess(userData);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button onClick={handleOpenModal} className={className}>
        {buttonText}
      </button>

      {/* LoginSignup Modal */}
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
