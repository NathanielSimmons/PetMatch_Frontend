import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';


export const signupUser = async (userData) => {
    try {
      const response = await axios.post(`${baseURL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  
  export const createPetProfile = async (petData) => {
    try {
      const response = await axios.post(`${baseURL}/pets`, petData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  export const getAllPets = async () => {
    try {
      const response = await axios.get(`${baseURL}/pets`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  export const getPetById = async (petId) => {
    try {
      const response = await axios.get(`${baseURL}/pets/${petId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  export const updatePetProfile = async (petId, petData) => {
    try {
      const response = await axios.put(`${baseURL}/pets/${petId}`, petData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  export const deletePetProfile = async (petId) => {
    try {
      const response = await axios.delete(`${baseURL}/pets/${petId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
