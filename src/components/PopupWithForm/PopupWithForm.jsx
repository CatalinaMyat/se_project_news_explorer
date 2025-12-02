import "./PopupWithForm.css";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  submitText,
  isSubmitDisabled,
  switchText,
  switchLinkText,
  onSwitchClick,
}) {
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

        <h3 className="popup__title">{title}</h3>

        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}

          <button
            type="submit"
            className="popup__submit"
            disabled={isSubmitDisabled}
          >
            {submitText}
          </button>
        </form>

        {switchText && switchLinkText && (
          <p className="popup__switch">
            {switchText}
            <button
              type="button"
              className="popup__switch-button"
              onClick={onSwitchClick}
            >
              {switchLinkText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;
