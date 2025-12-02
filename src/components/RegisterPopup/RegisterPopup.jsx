import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./RegisterPopup.css";

function RegisterPopup({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // Stage 1: simulate registration, App will open tooltip
    onRegister({ name, email });
  }

  const isSubmitDisabled = !email || !password || !name;

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

      <label className="popup__label">
        Username
        <input
          type="text"
          className="popup__input"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
          maxLength="30"
        />
      </label>
    </PopupWithForm>
  );
}

export default RegisterPopup;
