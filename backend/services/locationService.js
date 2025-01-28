const axios = require("axios");

async function getAddressFromCoordinates(latitude, longitude) {
  const accesToken = process.env.LOCATIONIQ_ACCESS_TOKEN;
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${accesToken}&lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await axios.get(url);
    return response.data.display_name;
  } catch (error) {
    console.error("Error getting address:", error.message);
    throw new Error("Failed to get address from coordinates");
  }
}

async function getLocationFromString(location) {
  
  const url = `https://eu1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q=${location}&format=json`;

  try {
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    console.error("Error getting location:", error.message);
    throw new Error("Failed to get location from string ");
  }
}


module.exports = {
  getAddressFromCoordinates,
  getLocationFromString
};
