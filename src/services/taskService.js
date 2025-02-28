import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tasks";

const handleError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};