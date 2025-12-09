import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./LoginPopup.css";

function LoginPopup({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
    }
  }, [isOpen]);

  function validateEmail(value) {
    if (!value) {
      setEmailError("");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (emailError) {
      return;
    }
    onLogin({ email, password });
  }

  const isSubmitDisabled = !email || !password || !!emailError;

  return (
    <PopupWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign in"
      isSubmitDisabled={isSubmitDisabled}
      switchText="or"
      switchLinkText="Sign up"
      onSwitchClick={onSwitchToRegister}
    >
      <label className="popup__label">
        Email
        <input
          type="email"
          className="popup__input"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="popup__error">{emailError}</span>}
      </label>

      <label className="popup__label">
        Password
        <input
          type="password"
          className="popup__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </label>
    </PopupWithForm>
  );
}

export default LoginPopup;
