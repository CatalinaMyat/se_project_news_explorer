import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./RegisterPopup.css";

function RegisterPopup({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
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
      setEmailError("This email is not available");
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

    onRegister({
      email,
      password,
      name: username,
    });
  }

  const isSubmitDisabled = !email || !password || !username || !!emailError;

  return (
    <PopupWithForm
      name="register"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign up"
      isSubmitDisabled={isSubmitDisabled}
      switchText="or"
      switchLinkText="Sign in"
      onSwitchClick={onSwitchToLogin}
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

      <label className="popup__label">
        Username
        <input
          type="text"
          className="popup__input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      {emailError && <span className="popup__error">{emailError}</span>}
    </PopupWithForm>
  );
}

export default RegisterPopup;
