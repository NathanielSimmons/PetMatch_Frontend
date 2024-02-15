import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPetById, updatePetProfile } from '../api';

const UpdatePetComponent = () => {
  const { petId } = useParams();
  const navigate = useNavigate(); 
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
      navigate('/pet-list'); 
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <div>
  <h2 className='form-title'>Update Pet</h2>
    <div className='update-profile-pet'>
      <form onSubmit={handleSubmit}>
      
        <div className='form-group'>
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="species" className="form-label">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            value={petData.species}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="breed" className="form-label">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="personality" className="form-label">Personality:</label>
          <input
            type="text"
            id="personality"
            name="personality"
            value={petData.personality}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="pictures" className="form-label">Pictures:</label>
          <input
            type="text"
            id="pictures"
            name="pictures"
            value={petData.pictures}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className='form-button'>Update Pet</button>
      </form>
    </div>
    </div>
  );
};

export default UpdatePetComponent;