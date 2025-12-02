import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./LoginPopup.css";

function LoginPopup({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // For Stage 1 we just simulate login with dummy user data.
    onLogin({ name: "Elise", email });
  }

  const isSubmitDisabled = !email || !password;

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
          onChange={(e) => setEmail(e.target.value)}
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
    </PopupWithForm>
  );
}

export default LoginPopup;
