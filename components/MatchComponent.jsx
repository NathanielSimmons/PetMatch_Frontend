import React, { useState, useEffect } from 'react';
import { getPetsForMatching, likePet, skipPet, getMatchedPets } from '../api';
import ProfileModal from './ProfileModal';

const MatchComponent = ({ user }) => {
  const [petsForMatching, setPetsForMatching] = useState([]);
  const [matchedPets, setMatchedPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getPetsForMatching(user?._id);
        console.log('Pets for matching: ', pets);
        setPetsForMatching(pets);
      } catch (error) {
        console.error('Error fetching pets for matching:', error);
      }
    };

    fetchPets();
  }, []);

  const handleLikeOrSkip = async (petId, action, body) => {
    try {
      await action(petId, body);
      setCurrentPetIndex((prevIndex) => prevIndex + 1);
      fetchMatchedPets();
    } catch (error) {
      console.error(`Error ${action === likePet ? 'liking' : 'skipping'} pet:`, error);
      setCurrentPetIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    fetchMatchedPets();
  }, []);

  const fetchMatchedPets = async () => {
    try {
      const pets = await getMatchedPets(user?._id);
      console.log('Matched Pets: ', pets)
      setMatchedPets(pets);
    } catch (error) {
      console.error('Error fetching matched pets:', error);
    }
  };

  const currentPet = petsForMatching[currentPetIndex];

  const handleOpenProfile = (pet) => {
    console.log('Triggered');
    setSelectedPet(pet);
  };

  const onClose = () => {
    setSelectedPet(null);
  };

  return (
    <>
      <div className="match-container">
        {currentPet && (
          <div className="current-pet">
            <img src={currentPet.pictures[0]} alt={currentPet.name} className="pet-image" />
            <h3>{currentPet.name}</h3>
            <div className="button-container">
              <button className='button' onClick={() => handleLikeOrSkip(currentPet._id, likePet, { userId: user?._id })} disabled={currentPet.owner === user?._id}>Like</button>
              <button className='button' onClick={() => handleLikeOrSkip(currentPet._id, skipPet, { userId: user?._id })}>Skip</button>
            </div>
          </div>
        )}
        <h2>Matched Pets</h2>
        <div className="matched-pets">
          {matchedPets.map((pet) => (
            <div key={pet?._id} className='matched-pet-container'>
              <img onClick={() => handleOpenProfile(pet)} src={pet?.pictures[0]} alt={pet?.name} className="matched-pet-image" />
              <div>{pet?.name}</div>
            </div>
          ))}
        </div>
      </div>
      <ProfileModal selectedPet={selectedPet} onClose={onClose} />
    </>
  );
};

export default MatchComponent;
