// Compare.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountries, selectCountries } from '../features/country/countrySlice';
import InputCompare from '../components/content/InputCompare';  

export default function Compare() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const [cca2_1, setCca2_1] = useState('');
  const [cca2_2, setCca2_2] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCompareClick = () => {
    if (cca2_1 && cca2_2) {
      const country1 = cca2_1.toLowerCase();
      const country2 = cca2_2.toLowerCase();
      navigate(`/compare/${country1}/n/${country2}`);
      setError(null);
    } else {
      setError('Please select both countries.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 h-screen max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center justify-center bg-gray-100 h-2/5">
          <div className="text-blue-500">
            <h1 className="text-4xl font-bold mb-3">Country Comparison</h1>
            <p className="text-xl font-semibold mb-12">
              Please select the countries to compare:
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-4 w-full mb-12">
          <InputCompare countries={countries} onSelect={setCca2_1} />
          <InputCompare countries={countries} onSelect={setCca2_2} />
        </div>

        {error && <p className="text-red-500 mb-5">{error}</p>}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 mb-12 mt-8 rounded-3xl shadow-lg transition duration-300 ease-in-out transform"
          onClick={handleCompareClick}
        >
          Compare
        </button>
      </div>
    </>
  );
}
