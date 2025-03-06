import axios from "axios";
import { createAuthHeaders } from "../utils/auth";

const API_AUTH_URL = "http://localhost:8080/auth";

const handleError = (error) => {
  console.error("API Error:", error);
  throw error;
};

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
    }
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user"); // Remove user data from localStorage
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user && user.token;
};

// Get user data from the API
export const getUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.email);
    const res = await axios.post(`${API_AUTH_URL}/profile`, {email: user.email} , { ...createAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};