import axios from 'axios';

const baseURL = import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/api" : 'https://petmatch-backend-1251cc59e577.herokuapp.com/api';

export const signupUser = async (userData, onProgress) => {
  try {
    const response = await axios.post(`${baseURL}/users/signup`, userData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(progress);
        }
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, userData);
    localStorage.setItem("user", JSON.stringify(response.data))
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
    const response = await axios.get(`${baseURL}/users/get-user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${baseURL}/users/update-user/${userId}`, userData);
    localStorage.setItem("user", JSON.stringify(response.data.user))
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const createPetProfile = async (petData) => {
  try {
    const response = await axios.post(`${baseURL}/pets/create-pet`, petData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllPets = async () => {
  try {
    const response = await axios.get(`${baseURL}/pets/get-all-pets`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getPetsPicturesForDisplay = async () => {
  try {
    const response = await axios.get(`${baseURL}/pets/get-pets-pictures-for-display`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserPets = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/pets/get-user-pets/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await axios.get(`${baseURL}/pets/get-pet/${petId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updatePetProfile = async (petId, petData) => {
  try {
    const response = await axios.put(`${baseURL}/pets/update-pet/${petId}`, petData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deletePetProfile = async (petId) => {
  try {
    const response = await axios.delete(`${baseURL}/pets/delete-pet/${petId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getPetsForMatching = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/match/get-pets-for-matching/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const likePet = async (petId, body) => {
  try {
    const response = await axios.post(`${baseURL}/match/like-pet/${petId}`, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const skipPet = async (petId) => {
  try {
    const response = await axios.post(`${baseURL}/match/skip-pet/${petId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// export const getMatchedPets = async (userId) => {
//   try {
//     const response = await axios.get(`${baseURL}/pets/get-all-pets`);
//     let matchedArray = []

//     response.data.map((pet) => {

//       pet.likedBy.map((likedByUser) => {

//         if (likedByUser === userId) {
//           matchedArray.push(pet)
//         }
//       })
//     })

//     console.log('Matched Array: ', matchedArray);
//     return matchedArray;
//   } catch (error) {
//     throw new Error(error.response.data.error);
//   }
// };

export const getMatchedPets = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/match/get-matched-pets/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};