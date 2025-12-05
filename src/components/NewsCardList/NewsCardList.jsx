import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const visibleArticles = articles.slice(0, visibleCount);

  function handleShowMore() {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  }

  function isArticleSaved(article) {
    return savedArticles.some((saved) => saved.url === article.url);
  }

  function getSavedArticle(article) {
    const match = savedArticles.find((saved) => saved.url === article.url);
    return match || article;
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__grid">
        {visibleArticles.map((article) => {
          const cardArticle = getSavedArticle(article);
          const saved = isArticleSaved(article);

          return (
            <NewsCard
              key={article.url}
              article={cardArticle}
              isLoggedIn={isLoggedIn}
              isSaved={saved}
              onSaveArticle={onSaveArticle}
              onRemoveArticle={onRemoveArticle}
            />
          );
        })}
      </div>

      {visibleCount < articles.length && (
        <div className="news-card-list__more-wrapper">
          <button
            type="button"
            className="news-card-list__more-button"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
