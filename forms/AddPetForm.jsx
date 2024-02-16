import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPets, deletePetProfile } from '../api';
import { Link } from 'react-router-dom';
import '../src/App.css'

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
      const response = await axios.post('https://pet-match-backend..app/api/pets', petData);
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
      const updatedUserPets = userPets.filter(pet => pet._id !== petId);
      setUserPets(updatedUserPets);
    } catch (error) {
      console.error('Error deleting pet:', error);
      setErrorMessage('Error deleting pet. Please try again.');
    }
  };

  return (
    <div>
      <h2 className='form-title'>Your Pets</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {userPets.map((pet) => (
          <div key={pet._id} className="pet-container" style={{ textAlign: 'center', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{pet.name}</h3>
            <img src={pet.pictures} alt={pet.name} className="pet-image" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <p>Breed: {pet.breed}</p>
            <Link to={`/update-pet/${pet._id}`}>Update</Link>
            <button onClick={() => handleDeletePet(pet._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="form-group">
      <h2 className='form-title'>Add a Pet</h2>
<form onSubmit={handleSubmit} className="pet-form">
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={petData.name}
      onChange={handleChange}
      required
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="species">Species:</label>
    <input
      type="text"
      id="species"
      name="species"
      value={petData.species}
      onChange={handleChange}
      required
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="breed">Breed:</label>
    <input
      type="text"
      id="breed"
      name="breed"
      value={petData.breed}
      onChange={handleChange}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="age">Age:</label>
    <input
      type="number"
      id="age"
      name="age"
      value={petData.age}
      onChange={handleChange}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="personality">Personality:</label>
    <input
      type="text"
      id="personality"
      name="personality"
      value={petData.personality}
      onChange={handleChange}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="pictures">Pictures:</label>
    <input
      type="text"
      id="pictures"
      name="pictures"
      value={petData.pictures}
      onChange={handleChange}
      className="form-input"
    />
  </div>
  <button type="submit" className="form-button">Add Pet</button>
</form>
</div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPetForm;