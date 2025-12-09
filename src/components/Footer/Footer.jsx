import { Link } from "react-router-dom";
import githubIcon from "../../assets/github_icon.svg";
import linkedinIcon from "../../assets/linkedin_icon.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2025 Supersite, Powered by News API</p>

      <nav className="footer__nav">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>

          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
        </div>

        <div className="footer__icons">
          <a
            className="footer__icon-link"
            href="https://github.com/CatalinaMyat"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <img src={githubIcon} alt="GitHub" className="footer__icon" />
          </a>

          <a
            className="footer__icon-link"
            href="https://www.linkedin.com/in/myo-myat-myat-thant-7b7a7714b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
