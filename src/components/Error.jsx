/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Error({ error }) {
  const errorMessage =
    error?.fault?.faultstring || error?.detail || 'An unknown error occurred.';

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <strong className="font-bold">An Error Occurred!</strong>
        <span className="block sm:inline"> {errorMessage}</span>
      </div>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}

export default Error;
