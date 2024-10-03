import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setNews } from '../features/news/newsSlice';
import NewsList from '../components/content/NewsList';
import Loader from '../components/Loader';
import Error from '../components/Error';

function News() {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const query = 'peace';
      const resultsPerPage = 12;
      const pagesNeeded = Math.ceil(resultsPerPage / 10);
      let allArticles = [];

      for (let page = 0; page < pagesNeeded; page++) {
        try {
          const articles = await dispatch(fetchNews({ query, page })).unwrap();
          allArticles = allArticles.concat(articles);
        } catch (err) {
          console.error('Failed to fetch articles:', err);
          dispatch(setNews([]));
          return;
        }
      }
      dispatch(setNews(allArticles.slice(0, resultsPerPage)));
    };

    fetchAllArticles();
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  return <NewsList news={news} />;
}

export default News;
