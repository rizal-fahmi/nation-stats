/* eslint-disable react/prop-types */
import formatPopulation from './FormatPopulation';

const CountryList = ({ countries }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-md max-w-screen-lg mb-4">
        <table className="min-w-full text-base text-left rtl:text-right text-gray-600">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="py-2 px-4 border-b text-sm md:text-base">No</th>
              <th className="py-2 px-4 border-b text-sm md:text-base">Flag</th>
              <th className="py-2 px-4 border-b text-sm md:text-base">Country</th>
              <th className="py-2 px-4 border-b text-sm md:text-base hidden md:table-cell">Code</th>
              <th className="py-2 px-4 border-b text-sm md:text-base">Population</th>
              <th className="py-2 px-4 border-b text-sm md:text-base hidden md:table-cell">
                Subregion
              </th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country.cca3} className="hover:bg-blue-50">
                <td className="py-2 px-4 text-sm md:text-base border-b">{index + 1}</td>
                <td className="py-2 px-4 text-sm md:text-base border-b justify-center items-center">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="h-6 w-8 rounded-sm"
                  />
                </td>
                <td className="py-2 px-4 text-sm md:text-base border-b">{country.name.common}</td>
                <td className="py-2 px-4 text-sm md:text-base border-b hidden md:table-cell">
                  {country.cca2}
                </td>
                <td className="py-2 px-4 text-sm md:text-base border-b">
                  {formatPopulation(country.population)}
                </td>
                <td className="py-2 px-4 text-sm md:text-base border-b hidden md:table-cell">
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
