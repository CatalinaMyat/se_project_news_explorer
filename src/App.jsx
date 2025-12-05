// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import SavedNews from "./components/SavedNews/SavedNews.jsx";

import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup.jsx";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip.jsx";

import { authorize, register, checkToken } from "./utils/auth";
import { getItems, saveArticle, deleteArticle } from "./utils/api";

// === NewsAPI config ===
const NEWS_API_KEY = "c9223fd96bde49cf8d30592699fbdb34";

// base URL switches between newsapi.org (dev) and nomoreparties proxy (prod)
const NEWS_API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

function App() {
  // --- SEARCH STATE ---
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // --- AUTH STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- POPUPS ---
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // --- SAVED ARTICLES ---
  const [savedArticles, setSavedArticles] = useState([]);

  // POPUP HANDLERS

  function handleLoginClick() {
    setIsRegisterOpen(false);
    setIsTooltipOpen(false);
    setIsLoginOpen(true);
  }

  function handleRegisterClick() {
    setIsLoginOpen(false);
    setIsTooltipOpen(false);
    setIsRegisterOpen(true);
  }

  function closeAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsTooltipOpen(false);
  }

  // AUTH LOGIC

  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        if (res.user || res.data) {
          setCurrentUser(res.user || res.data);
        }
        setIsLoggedIn(true);
        closeAllPopups();
      })
      .catch(() => {
        alert("Login failed: user not found");
      });
  }

  function handleRegister(data) {
    register(data)
      .then(() => {
        closeAllPopups();
        setIsTooltipOpen(true);
      })
      .catch(() => {
        alert("Registration failed");
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  }

  // CHECK TOKEN ON PAGE LOAD

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  // LOAD SAVED ARTICLES WHEN LOGGED IN

  useEffect(() => {
    if (!isLoggedIn) return;

    getItems()
      .then((items) => {
        setSavedArticles(items);
      })
      .catch((err) => console.error("Error loading saved articles:", err));
  }, [isLoggedIn]);

  // SEARCH FUNCTION

  function handleSearch(keyword) {
    const trimmed = keyword.trim();
    if (!trimmed) {
      setSearchError("Please enter a keyword.");
      setArticles([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setArticles([]);

    const encodedKeyword = encodeURIComponent(trimmed);

    const today = new Date();
    const to = today.toISOString().split("T")[0];

    const fromDate = new Date();
    fromDate.setDate(today.getDate() - 7);
    const from = fromDate.toISOString().split("T")[0];

    const requestUrl = `${NEWS_API_BASE_URL}?q=${encodedKeyword}&from=${from}&to=${to}&pageSize=100&apiKey=${NEWS_API_KEY}`;

    fetch(requestUrl)
      .then((res) => {
        if (!res.ok) {
          console.error("News API HTTP error:", res.status, res.statusText);
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.articles || data.articles.length === 0) {
          setSearchError("No results found");
          return;
        }
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => setIsLoading(false));
  }

  // ARTICLE SAVE / DELETE

  function handleSaveArticle(article) {
    saveArticle(article)
      .then((newArticle) => {
        setSavedArticles([newArticle, ...savedArticles]);
      })
      .catch((err) => console.error("Save failed:", err));
  }

  function handleDeleteArticle(article) {
    deleteArticle(article._id)
      .then(() => {
        setSavedArticles(savedArticles.filter((a) => a._id !== article._id));
      })
      .catch((err) => console.error("Delete failed:", err));
  }

  // derived flag: any popup open?
  const isAnyPopupOpen = isLoginOpen || isRegisterOpen || isTooltipOpen;

  // RENDER

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        isPopupOpen={isAnyPopupOpen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              articles={articles}
              isLoading={isLoading}
              searchError={searchError}
              isSearchDone={hasSearched}
              onSearch={handleSearch}
              onSaveArticle={handleSaveArticle}
              onRemoveArticle={handleDeleteArticle}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/saved-news"
          element={
            <SavedNews
              savedArticles={savedArticles}
              onDeleteArticle={handleDeleteArticle}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
        onSwitchToRegister={handleRegisterClick}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        onRegister={handleRegister}
        onSwitchToLogin={handleLoginClick}
      />

      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        onLoginClick={handleLoginClick}
      />

      <Footer />
    </>
  );
}

export default App;
