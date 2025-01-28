import { jwtDecode } from 'jwt-decode';
import React from "react";
import { useNavigate } from "react-router-dom";


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp > currentTime; // Check token expiration
  };
  
const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
    return <button onClick={handleLogout}>Logout</button>;
  };
  

export { isAuthenticated, Logout};


