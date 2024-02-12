
import React, { useState } from 'react';
import axios from 'axios';

const AddPetForm = () => {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    personality: '',
    pictures: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/pets', petData);
      // Handle successful pet addition
    } catch (error) {
      console.error('Error adding pet:', error);
      // Handle pet addition error
    }
  };

  return (
    <div>
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={petData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Species:</label>
          <input type="text" name="species" value={petData.species} onChange={handleChange} />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="breed" value={petData.breed} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={petData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Personality:</label>
          <input type="text" name="personality" value={petData.personality} onChange={handleChange} />
        </div>
        <div>
          <label>Pictures:</label>
          <input type="text" name="pictures" value={petData.pictures} onChange={handleChange} />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetForm;
