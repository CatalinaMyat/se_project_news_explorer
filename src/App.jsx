import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import SavedNews from "./components/SavedNews/SavedNews.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { searchNews } from "./utils/NewsApi.js";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup.jsx";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip.jsx";

function App() {
  // ===== NEWS SEARCH STATE =====
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ===== AUTH / USER STATE (GLOBAL) =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ===== POPUP STATE (LOGIN / REGISTER / TOOLTIP) =====
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // ===== SAVED ARTICLES STATE =====
  const [savedArticles, setSavedArticles] = useState([]);

  // ----- Search handler (unchanged) -----
  function handleSearch(keyword) {
    setIsLoading(true);
    setSearchError("");
    setHasSearched(true);

    searchNews(keyword)
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error(err);
        setSearchError("Sorry, something went wrong during the request.");
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ===== POPUP HANDLERS (FOR FUTURE MODALS) =====
  function openLoginPopup() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsTooltipOpen(false);
  }

  function openRegisterPopup() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsTooltipOpen(false);
  }

  function openTooltipPopup() {
    setIsTooltipOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  }

  function closeAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsTooltipOpen(false);
  }

  // ===== AUTH PLACEHOLDER HANDLERS =====
  // These will be replaced later with real API calls
  function handleLogin(dummyUserData = { name: "Elise" }) {
    setIsLoggedIn(true);
    setCurrentUser(dummyUserData);
    closeAllPopups();
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
    closeAllPopups();
  }

  function handleRegister(dummyUserData) {
    // Later: call API, then on success:
    openTooltipPopup();
  }

  // ===== SAVED ARTICLES PLACEHOLDERS =====
  function handleSaveArticle(article) {
    setSavedArticles((prev) => {
      // avoid duplicates using URL as a key
      if (prev.some((saved) => saved.url === article.url)) {
        return prev;
      }
      return [article, ...prev];
    });
  }

  function handleRemoveArticle(article) {
    setSavedArticles((prev) =>
      prev.filter((saved) => saved.url !== article.url)
    );
  }

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={openLoginPopup}
        onRegisterClick={openRegisterPopup}
        onLogout={handleLogout}
        // later you can also pass isLoginOpen etc. to header-controlled modals if needed
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearch={handleSearch}
              articles={articles}
              isLoading={isLoading}
              searchError={searchError}
              isSearchDone={hasSearched}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={handleSaveArticle}
              onRemoveArticle={handleRemoveArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              savedArticles={savedArticles}
              onRemoveArticle={handleRemoveArticle}
            />
          }
        />
      </Routes>

      <Footer />

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
        onSwitchToRegister={openRegisterPopup}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        onRegister={handleRegister}
        onSwitchToLogin={openLoginPopup}
      />

      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        onLoginClick={openLoginPopup}
      />
    </div>
  );
}

export default App;
