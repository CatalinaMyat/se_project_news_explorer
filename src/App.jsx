import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import SavedNews from "./components/SavedNews/SavedNews.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { searchNews } from "./utils/NewsApi.js";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearch={handleSearch}
              articles={articles}
              isLoading={isLoading}
              searchError={searchError}
              hasSearched={hasSearched}
            />
          }
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
