import axios from 'axios';

const RestCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default RestCountries;
