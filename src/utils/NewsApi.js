const NEWS_API_BASE_URL = "https://newsapi.org/v2/everything";

const NEWS_API_KEY = "c9223fd96bde49cf8d30592699fbdb34";

function getLastWeekRange() {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const format = (date) => date.toISOString().slice(0, 10);

  return {
    from: format(weekAgo),
    to: format(today),
  };
}

export function searchNews(keyword) {
  const { from, to } = getLastWeekRange();

  const url = new URL(NEWS_API_BASE_URL);
  url.searchParams.set("q", keyword);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("pageSize", "100");
  url.searchParams.set("apiKey", NEWS_API_KEY);

  return fetch(url.toString()).then((res) => {
    if (!res.ok) {
      throw new Error(`News API error: ${res.status}`);
    }
    return res.json();
  });
}
