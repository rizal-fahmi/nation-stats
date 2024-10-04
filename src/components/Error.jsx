/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Error({ error }) {
  const errorMessage =
    error?.fault?.faultstring || error?.detail || 'An unknown error occurred.';

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 rounded-lg">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded relative mb-8 w-7/12 text-center"
        role="alert"
      >
        <strong className="font-bold text-lg underline">An Error Occurred!</strong>
        <p className="mt-2">{errorMessage}</p>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="text-blue-500 hover:underline bg-blue-100 px-4 py-2 rounded transition duration-200"
        >
          Back to Home
        </Link>
        <button
          onClick={handleReload}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-200"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default Error;
