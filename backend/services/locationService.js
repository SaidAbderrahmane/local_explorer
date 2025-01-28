const axios = require("axios");

async function getAddressFromCoordinates(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    return response.data.results[0].formatted_address;
  } catch (error) {
    console.error("Error getting address:", error.message);
    throw new Error("Failed to get address from coordinates");
  }
}

async function getLocationFromString(location) {
  
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    console.error("Error getting location:", error.message);
    throw new Error("Failed to get location from string ");
  }
}

const fetchPlaceDetails = async (activityName, location) => {
  const { latitude, longitude } = location;
  
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activityName}&location=${latitude},${longitude}&radius=50&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;
    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};

module.exports = {
  getAddressFromCoordinates,
  getLocationFromString,
  fetchPlaceDetails,
};
