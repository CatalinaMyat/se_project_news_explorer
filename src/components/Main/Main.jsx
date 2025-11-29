import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./Main.css";

function Main({ onSearch, articles, isLoading, searchError, hasSearched }) {
  const hasResults = articles && articles.length > 0;

  return (
    <main className="main">
      {/* Hero + search */}
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">What&apos;s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <SearchForm onSearch={onSearch} />
        </div>
      </section>

      {/* Search states */}
      {isLoading && <Preloader />}

      {!isLoading && searchError && (
        <section className="main__status">
          <p className="main__status-text">{searchError}</p>
        </section>
      )}

      {!isLoading && !searchError && hasSearched && !hasResults && (
        <NothingFound />
      )}

      {!isLoading && !searchError && hasResults && (
        <NewsCardList articles={articles} />
      )}

      {/* About the author */}
      <About />
    </main>
  );
}

export default Main;
