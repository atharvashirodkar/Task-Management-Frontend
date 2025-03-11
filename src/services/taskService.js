import axios from "axios";
import { createAuthHeaders } from "../utils/auth";

const API_URL = "http://localhost:8080/api/v1/tasks";

const handleError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const getTasks = async ({ page, limit, title, status, startDate, endDate, q } = {}) => {
  try {
    const url = new URL(API_URL);
    const params = new URLSearchParams();

    if (page !== undefined && limit !== undefined) {
      params.append("page", page);
      params.append("limit", limit);
    }

    if (title) params.append("title", title);
    if (status) params.append("status", status);
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);
    if (q) params.append("q", q);

    url.search = params.toString();

    const response = await axios.get(url.toString(), { ...createAuthHeaders() });
    // console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/${taskId}`, createAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, createAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, createAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`, createAuthHeaders());
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};