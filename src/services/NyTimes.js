import axios from 'axios';

const NyTimes = async () => {
  const nyTimesKey = import.meta.env.VITE_NYTIMES_KEY;
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=peace&api-key=${nyTimesKey}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default NyTimes;
