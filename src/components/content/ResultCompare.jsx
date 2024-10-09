// RestCompare.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCountries,
  selectCountries,
} from '../../features/country/countrySlice';
import formatPopulation from './FormatPopulation';
import Compare from '../../pages/Compare';

const ResultCompare = () => {
  const { country1, country2 } = useParams();
  console.log('--->', country1, country2);
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const countryData1 = countries.find(
    (country) => country.cca2.toLowerCase() === country1
  );
  const countryData2 = countries.find(
    (country) => country.cca2.toLowerCase() === country2
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <>
      <Compare />
      <div className="flex-grow max-w-screen-lg mx-auto -mt-20 border-t-2 border-gray-400">
        {!countryData1 || !countryData2 ? (
          <p className="text-red-500 text-center mb-5">
            Please select two valid countries
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className=" text-gray-700">
                  <th className="pb-2 pt-10 w-1/3 text-center text-xl">
                    {countryData1.name.common}
                  </th>
                  <th className="pb-2 w-1/6 pt-10"></th>
                  <th className="pb-2 pt-10 w-1/3 text-center text-xl">
                    {countryData2.name.common}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 flex justify-center">
                    <img
                      src={countryData1.flags.svg}
                      alt={`Flag of ${countryData1.name.common}`}
                      className="h-16 object-contain mb-2 rounded-md"
                    />
                  </td>
                  <td className="py-4"></td>
                  <td className="py-4 flex justify-center">
                    <img
                      src={countryData2.flags.svg}
                      alt={`Flag of ${countryData2.name.common}`}
                      className="h-16 object-contain mb-2 rounded-md"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">{countryData1.capital}</td>
                  <td className="text-center font-bold">Capital</td>
                  <td className="text-center">{countryData2.capital}</td>
                </tr>
                <tr>
                  <td className="text-center">
                    {countryData1.region} (
                    {countryData1.subregion || countryData1.region})
                  </td>
                  <td className="text-center font-bold">Region (Subregion)</td>
                  <td className="text-center">
                    {countryData2.region} (
                    {countryData2.subregion || countryData2.region})
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    {formatPopulation(countryData1.population)}
                  </td>
                  <td className="text-center font-bold">Population</td>
                  <td className="text-center">
                    {formatPopulation(countryData2.population)}
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    {countryData1.area} Km<sup>2</sup>
                  </td>
                  <td className="text-center font-bold">Area</td>
                  <td className="text-center">
                    {countryData2.area} Km<sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    {countryData1.languages &&
                      Object.entries(countryData1.languages)
                        .map(([, name]) => name)
                        .join(', ')}
                  </td>
                  <td className="text-center font-bold">Languages</td>
                  <td className="text-center">
                    {countryData2.languages &&
                      Object.entries(countryData2.languages)
                        .map(([, name]) => name)
                        .join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="text-center pb-8">
                    {countryData1.currencies &&
                      Object.entries(countryData1.currencies)
                        .map(([, { name, symbol }]) => `${name} (${symbol})`)
                        .join(', ')}
                  </td>
                  <td className="text-center font-bold pb-8">Currencies</td>
                  <td className="text-center pb-8">
                    {countryData2.currencies &&
                      Object.entries(countryData2.currencies)
                        .map(([, { name, symbol }]) => `${name} (${symbol})`)
                        .join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultCompare;
