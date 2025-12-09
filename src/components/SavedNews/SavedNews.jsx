import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./SavedNews.css";

function SavedNews({
  isLoggedIn,
  currentUser,
  savedArticles,
  onRemoveArticle,
}) {
  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <div className="saved-news__container">
          <p className="saved-news__label">Saved articles</p>

          {currentUser && (
            <h2 className="saved-news__title">
              {currentUser.name}, you have {savedArticles.length} saved articles
            </h2>
          )}
        </div>
      </section>

      <section className="saved-news__results">
        <div className="saved-news__container">
          <NewsCardList
            articles={savedArticles}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveArticle={() => {}}
            onRemoveArticle={onRemoveArticle}
            isSavedPage={true}
          />
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
