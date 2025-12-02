// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github_icon.png";
import linkedinIcon from "../../assets/linkedin_icon.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>

      <nav className="footer__nav">
        {/* Home → internal route back to main page */}
        <Link to="/" className="footer__link">
          Home
        </Link>

        {/* TripleTen → external site */}
        <a
          className="footer__link"
          href="https://tripleten.com/"
          target="_blank"
          rel="noreferrer"
        >
          TripleTen
        </a>

        {/* GitHub icon → your GitHub profile */}
        <a
          className="footer__icon-link"
          href="https://github.com/CatalinaMyat"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <img src={githubIcon} alt="GitHub" className="footer__icon" />
        </a>

        {/* LinkedIn icon → your LinkedIn profile */}
        <a
          className="footer__icon-link"
          href="https://www.linkedin.com/in/myo-myat-myat-thant-7b7a7714b/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
