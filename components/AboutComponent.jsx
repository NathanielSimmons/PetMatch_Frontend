import React, { useState, useEffect } from 'react';
import '../src/App.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { getPetsPicturesForDisplay } from '../api';

const AboutComponent = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const data = await getPetsPicturesForDisplay();
        setPictures(data);
      } catch (error) {
        console.log('Error fetching pictures: ', error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <div>
      <h1 className="about-heading">About Us</h1>
      <p className="about-paragraph">Welcome to PetMatch, where furry friends find companionship! PetMatch is a web application designed to help pet owners connect their pets with suitable playmates in the local area. Similar to the popular dating app Tinder, PetMatch allows users to create profiles for their pets, browse through potential matches, and initiate conversations with other pet owners.</p>
      <div className='about-slider'>
        {pictures?.length > 0 &&
          <Slide duration={2000} cssClass='main-pets-slider'>
            {pictures.map((image, index) => (
              <div key={index}>
                <img className='main-pets-slider-image' src={image} />
              </div>
            ))}
          </Slide>
        }
      </div>
    </div>
  );
}

export default AboutComponent;