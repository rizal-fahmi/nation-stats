import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../features/country/countrySlice';
import CountryList from '../components/content/CountryList';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Home() {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  const sortedCountries = [...countries].sort(
    (a, b) => b.population - a.population
  );

  return <CountryList countries={sortedCountries} />;
}

export default Home;
