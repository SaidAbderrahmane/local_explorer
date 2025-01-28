
const axios = require("axios");


// Get the weather data from the OpenWeather API
const getWeather = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };
  
module.exports = {
    getWeather
};