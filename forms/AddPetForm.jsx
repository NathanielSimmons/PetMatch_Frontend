import React, { useState, useEffect } from 'react';
import { createPetProfile, deletePetProfile, getUserPets } from '../api';
import { Link } from 'react-router-dom';
import '../src/App.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const AddPetForm = ({ user }) => {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    personality: '',
    pictures: [],
    owner: user?._id
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userPets, setUserPets] = useState([]);

  const fetchUserPets = async () => {
    try {
      const petsData = await getUserPets(user?._id);
      setUserPets(petsData);
    } catch (error) {
      console.error('Error fetching user pets:', error);
    }
  };

  useEffect(() => {
    fetchUserPets();
  }, [user]);

  useEffect(() => {
    setPetData(prevPetData => ({
      ...prevPetData,
      owner: user?._id
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);
      setPetData({ ...petData, [name]: fileArray });
    } else {
      setPetData({ ...petData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', petData.name);
    form.append('species', petData.species);
    form.append('breed', petData.breed);
    form.append('age', petData.age);
    form.append('personality', petData.personality);
    form.append('owner', user?._id);

    if (petData.pictures && petData.pictures.length > 0) {
      petData.pictures.forEach(picture => {
        form.append('pictures', picture);
      });
    }
    try {
      const data = await createPetProfile(form);
      setPetData({
        name: '',
        species: '',
        breed: '',
        age: '',
        personality: '',
        pictures: [],
        owner: user?._id
      });
      setSuccessMessage(data.message);
      fetchUserPets();
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
            <img src={pet.pictures[0]} alt={pet.name} className="pet-image" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <p>Breed: {pet.breed}</p>
            {pet.pictures.length > 1 ?
              <Slide duration={2000} cssClass='user-pets-slider'>
                {pet.pictures.map((image, index) => (
                  <div key={index}>
                    <img className='user-pets-slider-image' src={image} />
                  </div>
                ))}
              </Slide>
              :
              <>
                <img className='user-pets-slider-image' src={pet.pictures[0]} />
                <br></br>
              </>
            }
            <Link to={`/update-pet/${pet._id}`}>Update</Link>
            <button className='button' onClick={() => handleDeletePet(pet._id)}>Delete</button>
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
              required
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
              required
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
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pictures">Pictures:</label>
            <input
              type="file"
              multiple
              id="pictures"
              name="pictures"
              accept="image/*"
              onChange={handleChange}
              required
              className="form-upload"
            />
          </div>
          <div className="pictures-preview">
            {petData.pictures.map((picture, index) => (
              <img
                key={index}
                src={URL.createObjectURL(picture)}
                alt={`Uploaded ${index + 1}`}
                style={{ width: '100px', height: '100px', margin: '5px' }}
              />
            ))}
          </div>
          <button type="submit" className="form-button button">Add Pet</button>
        </form>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPetForm;