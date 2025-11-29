import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__link ${
          location.pathname === "/" ? "navigation__link_active" : ""
        } ${!isSavedPage ? "navigation__link_theme_dark" : ""}`}
      >
        Home
      </Link>

      <Link
        to="/saved-news"
        className={`navigation__link ${
          isSavedPage ? "navigation__link_active" : ""
        } ${!isSavedPage ? "navigation__link_theme_dark" : ""}`}
      >
        Saved articles
      </Link>
    </nav>
  );
}

export default Navigation;
