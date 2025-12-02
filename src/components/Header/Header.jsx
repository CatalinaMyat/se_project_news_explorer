import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSavedPage = location.pathname === "/saved-news";

  function handleBurgerClick() {
    setIsMobileMenuOpen(true);
  }

  function handleCloseMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function handleAuthButtonClick() {
    if (isLoggedIn) {
      onLogout();
    } else {
      onLoginClick();
    }
  }

  const authButtonText = isLoggedIn ? currentUser?.name || "Elise" : "Sign in";

  return (
    <header className={`header ${isSavedPage ? "header_theme_light" : ""}`}>
      <div className="header__container">
        <div className="header__logo">NewsExplorer</div>

        {/* Desktop navigation */}
        <Navigation isSavedPage={isSavedPage} />

        {/* Auth button */}
        <button
          type="button"
          className={`header__auth-button ${
            isSavedPage
              ? "header__auth-button_light"
              : "header__auth-button_dark"
          }`}
          onClick={handleAuthButtonClick}
        >
          {authButtonText}
        </button>

        {/* Burger button */}
        <button
          type="button"
          className={`header__burger ${
            isSavedPage ? "header__burger_light" : "header__burger_dark"
          }`}
          aria-label="Open menu"
          onClick={handleBurgerClick}
        >
          <span className="header__burger-line" />
          <span className="header__burger-line" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileMenu onClose={handleCloseMobileMenu} isSavedPage={isSavedPage} />
      )}
    </header>
  );
}

export default Header;
