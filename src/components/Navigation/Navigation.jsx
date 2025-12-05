import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn }) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <nav
      className={`navigation ${
        isLoggedIn ? "navigation_logged-in" : "navigation_logged-out"
      }`}
    >
      <Link
        to="/"
        className={`navigation__link ${
          location.pathname === "/" ? "navigation__link_active" : ""
        } ${!isSavedPage ? "navigation__link_theme_dark" : ""}`}
      >
        Home
      </Link>

      {isLoggedIn && (
        <Link
          to="/saved-news"
          className={`navigation__link ${
            isSavedPage ? "navigation__link_active" : ""
          } ${!isSavedPage ? "navigation__link_theme_dark" : ""}`}
        >
          Saved articles
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
