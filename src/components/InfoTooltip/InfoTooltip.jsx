import "./InfoTooltip.css";
import "../PopupWithForm/PopupWithForm.css";

function InfoTooltip({ isOpen, onClose, onLoginClick }) {
  function handleOverlayMouseDown(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="popup__title">Registration successfully completed!</h3>

        <button type="button" className="popup__submit" onClick={onLoginClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
