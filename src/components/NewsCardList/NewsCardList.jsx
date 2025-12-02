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

  return (
    <section className="news-card-list">
      {/* No title here — the h2 lives in Main.jsx */}
      <div className="news-card-list__grid">
        {visibleArticles.map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
          />
        ))}
      </div>

      {visibleCount < articles.length && (
        <button
          type="button"
          className="news-card-list__more-button"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
