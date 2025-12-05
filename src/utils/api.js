let savedArticles = [];

const generateFakeId = () =>
  `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;

export function getItems() {
  return new Promise((resolve) => {
    resolve(savedArticles);
  });
}

export function saveArticle(article) {
  return new Promise((resolve) => {
    const savedArticle = {
      ...article,
      _id: generateFakeId(),
    };

    savedArticles = [savedArticle, ...savedArticles];

    resolve(savedArticle);
  });
}

export function deleteArticle(articleId) {
  return new Promise((resolve) => {
    savedArticles = savedArticles.filter((item) => item._id !== articleId);
    resolve({ message: "Article deleted (stubbed api.js)" });
  });
}
