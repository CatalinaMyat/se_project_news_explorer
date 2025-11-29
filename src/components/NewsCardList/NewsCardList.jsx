import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>

      <div className="news-card-list__grid">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>

      <button type="button" className="news-card-list__more-button">
        Show more
      </button>
    </section>
  );
}

export default NewsCardList;
