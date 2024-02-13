import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getPetById, updatePetProfile } from './api';

const UpdatePetComponent = () => {
  const { petId } = useParams();
  const history = useHistory();
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
      history.push('/'); // Redirect to home page after successful update
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
        {/* Add input fields for other pet details */}
        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
};

export default UpdatePetComponent;
