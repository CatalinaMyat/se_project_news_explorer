import { Link, useLocation } from "react-router-dom";
import "./MobileMenu.css";

function MobileMenu({ onClose, isSavedPage, isLoggedIn, onLoginClick }) {
  const location = useLocation();

  return (
    <div className="mobile-menu">
      <div
        className={`mobile-menu__panel ${
          isSavedPage ? "mobile-menu__panel_theme_light" : ""
        }`}
      >
        <div
          className={`mobile-menu__header ${
            isSavedPage ? "mobile-menu__header_theme_light" : ""
          }`}
        >
          <div className="mobile-menu__logo">NewsExplorer</div>
          <button
            type="button"
            className="mobile-menu__close"
            aria-label="Close menu"
            onClick={onClose}
          />
        </div>

        <nav className="mobile-menu__nav">
          <Link
            to="/"
            className={`mobile-menu__link ${
              location.pathname === "/" ? "mobile-menu__link_active" : ""
            }`}
            onClick={onClose}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`mobile-menu__link ${
                location.pathname === "/saved-news"
                  ? "mobile-menu__link_active"
                  : ""
              }`}
              onClick={onClose}
            >
              Saved articles
            </Link>
          )}

          <button
            type="button"
            className="mobile-menu__auth-button"
            onClick={() => {
              if (onLoginClick) {
                onLoginClick();
              }
              onClose();
            }}
          >
            Sign in
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
