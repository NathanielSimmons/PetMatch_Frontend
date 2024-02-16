import axios from 'axios';

const baseURL = 'https://pet-match-backend.vercel.app';

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
    localStorage.setItem("user",JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('An error occurred while logging in');
    }
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${baseURL}/users/logout`);
    localStorage.removeItem("user")
    window.location.replace('/');
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${baseURL}/users/${userId}`, userData);
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

export const getPetsForMatching = async () => {
  try {
    const response = await axios.get(`${baseURL}/match/pets`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const likePet = async (petId, body) => {
  try {
    const response = await axios.post(`${baseURL}/match/${petId}/like`, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const skipPet = async (petId) => {
  try {
    const response = await axios.post(`${baseURL}/match/${petId}/skip`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getMatchedPets = async (userId) => {
  console.log(userId)
  try {
    const response = await axios.get(`${baseURL}/pets`);
    let matchedArray = []
    
    response.data.map((res)=>{
      
      res.likedBy.map((banana)=>{
        
        if (banana===userId){
          matchedArray.push(res)
        }
      })
    })

return matchedArray;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};