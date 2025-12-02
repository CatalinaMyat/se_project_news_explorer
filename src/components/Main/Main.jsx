import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import "./Main.css";

function Main({
  onSearch,
  isLoading,
  articles,
  isSearchDone,
  searchError,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  return (
    <main className="main">
      {/* HERO SECTION */}
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">What’s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          {/* Search form */}
          <div className="main__search">
            <SearchForm onSearch={onSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* RESULTS SECTION (only after a search) */}
      {isSearchDone && (
        <section className="main__results">
          <div className="main__results-container">
            <h2 className="main__results-title">Search results</h2>

            {isLoading && <Preloader />}

            {!isLoading && searchError && (
              <NothingFound message={searchError} />
            )}

            {!isLoading && !searchError && articles.length === 0 && (
              <NothingFound message="Sorry, nothing found for this request." />
            )}

            {!isLoading && !searchError && articles.length > 0 && (
              <NewsCardList
                articles={articles}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSaveArticle={onSaveArticle}
                onRemoveArticle={onRemoveArticle}
              />
            )}
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      <section className="main__about">
        <About />
      </section>
    </main>
  );
}

export default Main;
