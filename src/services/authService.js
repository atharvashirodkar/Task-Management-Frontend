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
    if (response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

// Logout user
export const logout = async (refreshToken) => {

  console.log(refreshToken);


  try {
    if (refreshToken) {
      await axios.post(`${API_AUTH_URL}/logout`, refreshToken);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  localStorage.removeItem("user"); 
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.accessToken;
};

// Get user data from the API
export const getUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.email);
    const res = await axios.post(`${API_AUTH_URL}/profile`, { email: user.email }, { ...createAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Function to change password
export const changePassword = async (userData) => {
  try {
    await axios.post(`${API_AUTH_URL}/change-password`, userData, createAuthHeaders());
  } catch (error) {
    console.error('Error changing password:', error.response?.data || error.message);
    throw error;
  }
};