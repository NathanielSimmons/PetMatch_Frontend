import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPetById, updatePetProfile } from '../api';

const UpdatePetComponent = () => {
  const { petId } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook to navigate
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    personality: '',
    pictures: ''
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const pet = await getPetById(petId);
        setPetData(pet);
      } catch (error) {
        console.error('Error fetching pet:', error);
      }
    };

    fetchPet();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePetProfile(petId, petData);
      navigate('/pet-list'); // Redirect to home page after successful update
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <div>
      <h2>Update Pet</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for pet details */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
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
        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
};

export default UpdatePetComponent;