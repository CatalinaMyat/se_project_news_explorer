import "./NewsCard.css";
import saveIcon from "../../assets/save_icon.svg";
import saveIconFilled from "../../assets/save_icon_filled.svg";
import trashIcon from "../../assets/trash.svg";

function NewsCard({
  article,
  isSaved = false,
  isLoggedIn = false,
  onSaveArticle,
  onRemoveArticle,
  onLoginClick,
  isSavedPage = false,
}) {
  const { urlToImage, title, description, publishedAt, source, url } = article;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleSaveClick = (evt) => {
    evt.preventDefault();

    if (!isLoggedIn) {
      if (onLoginClick) {
        onLoginClick();
      }
      return;
    }

    if (isSaved) {
      if (onRemoveArticle) {
        onRemoveArticle(article);
      }
    } else {
      if (onSaveArticle) {
        onSaveArticle(article);
      }
    }
  };

  const saveButtonClassName = `news-card__save-button${
    isSaved ? " news-card__save-button_saved" : ""
  }`;

  const iconSrc = isSavedPage ? trashIcon : isSaved ? saveIconFilled : saveIcon;

  const iconAlt = isSavedPage
    ? "remove article from saved"
    : isSaved
    ? "remove article from saved"
    : "save article";

  const shouldShowTooltip = isSavedPage || !isLoggedIn;
  const tooltipText = isSavedPage
    ? "Remove from saved"
    : "Sign in to save articles";

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

      <button
        type="button"
        className={saveButtonClassName}
        onClick={handleSaveClick}
        aria-label={iconAlt}
      >
        <img src={iconSrc} alt={iconAlt} className="news-card__save-icon" />
      </button>

      {shouldShowTooltip && (
        <span className="news-card__tooltip">{tooltipText}</span>
      )}
    </article>
  );
}

export default NewsCard;
