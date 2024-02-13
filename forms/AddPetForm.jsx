import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPets, deletePetProfile } from '../api';
import { Link } from 'react-router-dom';


const AddPetForm = ({ user }) => {
  
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    personality: '',
    pictures: '',
    owner: user?._id
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const petsData = await getAllPets();
        const userPets = petsData.filter(pet => pet.owner === user?._id);
        setUserPets(userPets);
      } catch (error) {
        console.error('Error fetching user pets:', error);
      }
    };

    fetchUserPets();
  }, [user]);

  useEffect(() => {
    setPetData(prevPetData => ({
      ...prevPetData,
      owner: user?._id
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/pets', petData);
      setPetData({
        name: '',
        species: '',
        breed: '',
        age: '',
        personality: '',
        pictures: '',
        owner: user?._id
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding pet:', error);
      setErrorMessage('Error adding pet. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await deletePetProfile(petId);
      const updatedUserPets =userPets.filter(pet => pet._id !== petId);
      setUserPets(updatedUserPets);
    } catch (error) {
      console.error('Error deleting pet:', error);
      setErrorMessage('Error deleting pet. Please try again.');
    }
  };

  return (
    <div>
      <h2>Your Pets</h2>
      <ul>
        {userPets.map((pet) => (
          <li key={pet._id}>
            {pet.name} - {pet.species}
            <Link to={`/update-pet/${pet._id}`}>Update</Link>
            <button onClick={() => handleDeletePet(pet._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="species">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            value={petData.species}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="personality">Personality:</label>
          <input
            type="text"
            id="personality"
            name="personality"
            value={petData.personality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pictures">Pictures:</label>
          <input
            type="text"
            id="pictures"
            name="pictures"
            value={petData.pictures}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPetForm;
