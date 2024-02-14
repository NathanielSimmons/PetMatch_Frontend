import React, { useState, useEffect } from 'react';
import { getPetsForMatching, likePet, skipPet, getMatchedPets } from '../api';

const MatchComponent = () => {
  const [petsForMatching, setPetsForMatching] = useState([]);
  const [matchedPets, setMatchedPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getPetsForMatching();
        setPetsForMatching(pets);
      } catch (error) {
        console.error('Error fetching pets for matching:', error);
      }
    };

    fetchPets();
  }, []);

  const handleLike = async (petId) => {
    try {
      await likePet(petId);
      setCurrentPetIndex(currentPetIndex + 1);
    } catch (error) {
      console.error('Error liking pet:', error);
    }
  };

  const handleSkip = async (petId) => {
    try {
      await skipPet(petId);
      setCurrentPetIndex(currentPetIndex + 1);
    } catch (error) {
      console.error('Error skipping pet:', error);
    }
  };

  useEffect(() => {
    const fetchMatchedPets = async () => {
      try {
        const pets = await getMatchedPets();
        setMatchedPets(pets);
      } catch (error) {
        console.error('Error fetching matched pets:', error);
      }
    };

    fetchMatchedPets();
  }, []);

  const currentPet = petsForMatching[currentPetIndex];

  return (
    <div>
      {currentPet && (
        <div>
          <img src={currentPet.pictures} alt={currentPet.name} />
          <h3>{currentPet.name}</h3>
          <button onClick={() => handleLike(currentPet._id)}>Like</button>
          <button onClick={() => handleSkip(currentPet._id)}>Skip</button>
        </div>
      )}
      <h2>Matched Pets</h2>
      <ul>
        {matchedPets.map((pet) => (
          <li key={pet._id}>
            <img src={pet.pictures} alt={pet.name} />
            <span>{pet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchComponent;
