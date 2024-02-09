import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Implement other API call functions for user and pet data, etc.