/* eslint-disable react/prop-types */
import { useState } from 'react';

const InputCompare = ({ countries, onSelect }) => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChangeHandler = (text) => {
    setText(text);
    if (text.length > 0) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredCountries);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionHandler = (country) => {
    setText(country.name.common);
    onSelect(country.cca2);
    setSuggestions([]);
  };

  return (
    <div className="relative w-2/3 mx-auto">
      <input
        className="input text-black p-2 rounded-md w-full border border-blue-500 focus:ring-blue-400 focus:border-blue-400"
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
        placeholder="Search for country..."
      />
      {suggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-full z-10">
          {suggestions.map((country, index) => (
            <div
              key={index}
              onClick={() => onSuggestionHandler(country)}
              className="p-2 hover:bg-blue-100"
            >
              {country.name.common} ({country.cca2})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputCompare;
