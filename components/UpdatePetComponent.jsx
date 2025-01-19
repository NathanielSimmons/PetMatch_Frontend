import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    pictures: []
  });
  const [updatedPictures, setUpdatedPictures] = useState([]);

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

  const handlePicturesChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setUpdatedPictures(fileArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', petData.name);
    form.append('species', petData.species);
    form.append('breed', petData.breed);
    form.append('age', petData.age);
    form.append('personality', petData.personality);

    if (updatedPictures && updatedPictures.length > 0) {
      updatedPictures.forEach(picture => {
        form.append('pictures', picture);
      });
    }
    try {
      await updatePetProfile(petId, form);
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
              type="file"
              multiple
              accept="image/*"
              id="pictures"
              name="pictures"
              onChange={handlePicturesChange}
              className="form-input"
            />
          </div>
          <div className="pictures-preview">
            {updatedPictures.length > 0 ?
              <>
                {updatedPictures.map((picture, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(picture)}
                    alt={`Uploaded ${index + 1}`}
                    style={{ width: '100px', height: '100px', margin: '5px' }}
                  />
                ))}
              </>
              :
              <>
                {petData.pictures.map((picture, index) => (
                  <img
                    key={index}
                    src={picture}
                    alt={`Uploaded ${index + 1}`}
                    style={{ width: '100px', height: '100px', margin: '5px' }}
                  />
                ))}
              </>
            }
          </div>
          <button type="submit" className='form-button button'>Update Pet</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePetComponent;