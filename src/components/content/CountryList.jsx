/* eslint-disable react/prop-types */
import formatPopulation from './Formatpopulation';

const CountryList = ({ countries }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-md max-w-screen-lg mb-4">
        <table className="w-full text-base text-left rtl:text-right text-gray-600">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Flag</th>
              <th className="py-2 px-4 border-b">Country</th>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Population</th>
              <th className="py-2 px-4 border-b">Subregion</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country.cca3} className="hover:bg-blue-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b justify-center items-center">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="h-6 w-8 rounded-sm"
                  />
                </td>
                <td className="py-2 px-4 border-b">{country.name.common}</td>
                <td className="py-2 px-4 border-b">{country.cca2}</td>
                <td className="py-2 px-4 border-b">
                  {formatPopulation(country.population)}
                </td>
                <td className="py-2 px-4 border-b">
                  {country.subregion ? country.subregion : country.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryList;
