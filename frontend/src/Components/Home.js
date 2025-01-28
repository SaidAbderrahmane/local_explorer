import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import apiClient from "../api/apiClient"; // Adjust the path as necessary
import "swiper/css";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [location, setLocation] = useState("undefined");
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user location on button click
  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation(position.coords);
            resolve(position.coords);
          },
          (error) => {
            setError("Unable to access location. Please enable location services in your browser.");
            reject(error);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const getActivities = async () => {
    try {
      setLoading(true); // Set loading to true
      if (!currentLocation) {
        await getLocation(); // Wait for location to be retrieved
      }
      await fetchData(); // Fetch data after location is set
    } catch (error) {
      setError("Failed to get activities.");
    } finally {
      setLoading(false); // Always set loading to false at the end
    }
  };

  const fetchData = async () => {
    if (currentLocation) {
      try {
        const latitude = currentLocation.latitude;
        const longitude = currentLocation.longitude;
        const response = await apiClient.get(
          `/activities?lat=${latitude}&lon=${longitude}`
        );

        setActivities(response.data.suggestions || []);
        setLocation(response.data.address || "Unknown location");
        setWeather(response.data.weather || null);

        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch data from the server.");
      }
    }
  };

  // Fetch activities, weather, and location data
  useEffect(() => {
    getActivities();
  }, []);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      {/* Error message */}
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 text-red-800 p-4 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          title="map"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD4SObQh6Cdok0AkF6SuRpcTCXgdPmyamQ&q=${currentLocation
            ? `${currentLocation.latitude},${currentLocation.longitude}`
            : "47.3522,2.3522"
            }`}
          allowFullScreen
        ></iframe>
      </div>

      {/* Top Info Cards */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <p>
          <span className="font-bold">Location:</span> {location}
        </p>
        <p>
          <span className="font-bold">Coordinates:</span>{" "}
          {currentLocation
            ? `${currentLocation.latitude}, ${currentLocation.longitude}`
            : "Unknown"}
        </p>
        <p>
          <span className="font-bold">Weather:</span>{" "}
          {weather
            ? `${weather.main.temp}°C, ${weather.weather[0].description}`
            : "undefined"}
        </p>
        <p>
          <span className="font-bold">Current Time:</span> {currentTime}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-lg flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-yellow-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.784 3.907 2.074 5.291l3.926-2z"></path>
          </svg>
          <span>Loading activities...</span>
        </div>
      )}

      {/* Geolocation Button */}
      <div className="absolute top-4 right-4 p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={getActivities}
        >
          Explore!
        </button>
      </div>

      {/* Swiper Cards */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Swiper spaceBetween={10} slidesPerView={1.2}>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-4 m-2 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold">{activity.activityName}</h3>
                  <p>
                    <span className="font-bold">Type:</span> {activity.activityType}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {activity.description || "No description available."}
                  </p>
                  <p>
                    <span className="font-bold">Location:</span> {activity.location}
                  </p>
                  <p>
                    <span className="font-bold">Distance:</span> {activity.distance || "N/A"}
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="bg-white p-4 m-2 rounded-lg shadow-lg">
                <p className="text-center">No activities found.</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
