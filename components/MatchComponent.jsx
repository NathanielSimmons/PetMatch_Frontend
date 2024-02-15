import React, { useState, useEffect } from 'react';
import { getPetsForMatching, likePet, skipPet, getMatchedPets } from '../api';



const MatchComponent = ({user}) => {
  const [petsForMatching, setPetsForMatching] = useState([]);
  const [matchedPets, setMatchedPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getPetsForMatching();
        const filteredPets = pets.filter(pet => pet.owner !== user?._id);
        setPetsForMatching(filteredPets);
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
    } catch (error) {
      console.error(`Error ${action === likePet ? 'liking' : 'skipping'} pet:`, error);
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
    <div className="match-container">
      {currentPet && (
        <div className="current-pet">
          <img src={currentPet.pictures} alt={currentPet.name} className="pet-image" />
          <h3>{currentPet.name}</h3>
          <div className="button-container">
            <button onClick={() => handleLikeOrSkip(currentPet._id, likePet, {userId: user?._id})}>Like</button>
            <button onClick={() => handleLikeOrSkip(currentPet._id, skipPet, {userId: user?._id})}>Skip</button>
          </div>
        </div>
      )}
      <h2>Matched Pets</h2>
      <ul className="matched-pets">
        {matchedPets.map((pet) => (
          <li key={pet._id}>
            <img src={pet.pictures} alt={pet.name} className="matched-pet-image" />
            <span>{pet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchComponent;
