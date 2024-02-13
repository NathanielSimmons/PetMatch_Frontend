import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPets } from '../api';

const AddPetForm = () => {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    personality: '',
    pictures: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getAllPets();
        console.log('Fetched pets:', petsData);
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []); // Run this effect only once, when the component mounts
  console.log('Pets state:', pets);

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
        pictures: ''
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding pet:', error);
      setErrorMessage('Error adding pet. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    
      <div>
      <h2>All Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>{pet.name} - {pet.species}</li>
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
