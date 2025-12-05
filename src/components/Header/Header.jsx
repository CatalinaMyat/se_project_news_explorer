import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import "./Header.css";
import menuIcon from "../../assets/menu_bar.svg";
import logoutIcon from "../../assets/logout_icon.svg";

function Header({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogout,
  isPopupOpen,
}) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSavedPage = location.pathname === "/saved-news";

  function handleMenuIconClick() {
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

  const authButtonText =
    isLoggedIn && currentUser ? currentUser.name : "Sign in";

  const authButtonStateClass =
    isLoggedIn && currentUser
      ? "header__auth-button_logged-in"
      : "header__auth-button_logged-out";

  const containerClassName = `header__container ${
    isLoggedIn ? "header__container_logged-in" : "header__container_logged-out"
  }`;

  return (
    <header className={`header ${isSavedPage ? "header_theme_light" : ""}`}>
      <div className={containerClassName}>
        <div className="header__logo">NewsExplorer</div>

        <Navigation isLoggedIn={isLoggedIn} />

        <button
          type="button"
          className={`header__auth-button ${
            isSavedPage
              ? "header__auth-button_light"
              : "header__auth-button_dark"
          } ${authButtonStateClass}`}
          onClick={handleAuthButtonClick}
        >
          <span className="header__auth-text">{authButtonText}</span>

          {isLoggedIn && (
            <img
              src={logoutIcon}
              alt="Log out"
              className={`header__auth-icon ${
                isSavedPage
                  ? "header__auth-icon_theme_light"
                  : "header__auth-icon_theme_dark"
              }`}
            />
          )}
        </button>

        {!isPopupOpen && (
          <button
            type="button"
            className="header__menu-button"
            aria-label="Open menu"
            onClick={handleMenuIconClick}
          >
            <img
              src={menuIcon}
              alt="Open menu"
              className={`header__menu-icon ${
                isSavedPage
                  ? "header__menu-icon_theme_light"
                  : "header__menu-icon_theme_dark"
              }`}
            />
          </button>
        )}
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          onClose={handleCloseMobileMenu}
          isSavedPage={isSavedPage}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
        />
      )}
    </header>
  );
}

export default Header;
