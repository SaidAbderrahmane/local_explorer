//importing the services
const { getWeather } = require('../services/weatherService');
const { getSuggestions, getSuggestsionsJson } = require('../services/GeminiService');
const { getAddressFromCoordinates, getLocationFromString, fetchPlaceDetails } = require('../services/locationService');


async function getActivities(req, res){
    console.log(req.query);
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).send('Latitude and Longitude are required');
    }
  
    try {
      const currentDateTime = new Date();
      const address = await getAddressFromCoordinates(lat, lon);
      console.log(address);
      const weather = await getWeather(lat, lon);
      var suggestions = await getSuggestsionsJson(address, weather, currentDateTime );
      suggestions = await Promise.all(suggestions.map(async suggestion => {
        try {
          const places = await fetchPlaceDetails(suggestion.activityName, { latitude: lat, longitude: lon });
          return {
            ...suggestion,
            places,
          };
        } catch (error) {
          console.error(`Error fetching places for ${suggestion.activityName}: ${error.message}`);
          return suggestion;
        }
      }));
      
      //to review *******
      // const newSuggestions = await Promise.all(suggestions.map(async suggestion => {
      //   try {
      //     const location =  await getLocationFromString(suggestion.location);
      //     return {
      //       ...suggestion,
      //       lat: location.lat,
      //       lon: location.lon,
      //       gmaps: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`,
      //     };
      //   } catch (error) {
      //     console.error(`Error getting location: ${error.message}`);
      //     return suggestion;
      //   }
      // }));
      //*******
      
      
      res.json({address, weather, suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  module.exports = {
    getActivities
  };