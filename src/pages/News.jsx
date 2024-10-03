import { useEffect, useState } from 'react';
import NyTimes from '../services/NyTimes';
import NewsList from '../components/content/NewsList';

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  async function getNews() {
    try {
      const data = await NyTimes();
      setNews(data.response.docs);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
	console.log(news)
  return (
    <>
      <NewsList news={news} />
    </>
  );
}

export default News;
