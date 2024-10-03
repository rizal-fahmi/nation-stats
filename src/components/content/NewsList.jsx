import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const NewsList = ({ news }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 my-8">
      {news.map((n, i) => (
        <article
          key={'news-' + i}
          className="max-w-sm bg-white border border-gray-200 rounded-t-2xl shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={n.web_url}>
            <img
              className="rounded-t-2xl h-60 w-full"
              src={
                n.multimedia.length > 0
                  ? `https://static01.nyt.com/${n.multimedia[0].url}`
                  : 'http://apple.test/img/default-post3.avif'
              }
              alt={n.headline.main}
            />
          </Link>
          <div className="p-5">
            <Link to={n.web_url}>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {n.headline.main}
              </h5>
            </Link>
            <p className="mb-3 text-gray-700 dark:text-gray-400">
              {n.abstract.substring(0, 120)}...
            </p>
            <Link
              to={n.web_url}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsList;
