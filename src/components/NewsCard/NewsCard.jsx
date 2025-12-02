import "./NewsCard.css";
import saveIcon from "../../assets/save_icon.png";

function NewsCard({ article }) {
  const { urlToImage, title, description, publishedAt, source, url } = article;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="news-card">
      <a
        className="news-card__link"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="news-card__image-wrapper">
          {urlToImage ? (
            <img className="news-card__image" src={urlToImage} alt={title} />
          ) : (
            <div className="news-card__image news-card__image_placeholder" />
          )}
        </div>

        <div className="news-card__content">
          <p className="news-card__date">{date}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{description}</p>
          <p className="news-card__source">{source?.name}</p>
        </div>
      </a>

      {/* Save button (icon only for now) */}
      <button type="button" className="news-card__save-button">
        <img
          src={saveIcon}
          alt="save article"
          className="news-card__save-icon"
        />
      </button>
    </article>
  );
}

export default NewsCard;
