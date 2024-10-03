import { useEffect, useState } from 'react';
import RestCountries from '../services/RestCountries';
import CountryList from '../components/content/CountryList';

function Home() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  async function getCountries() {
    try {
      const response = await RestCountries();
      setCountries(response);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

	const sortedCountries = [...countries].sort(
		(a, b) => b.population - a.population
	);

	return (
		<>
			<CountryList countries={sortedCountries} />
		</>
	);
}

export default Home;
