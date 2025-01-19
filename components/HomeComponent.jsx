import React, { useState, useEffect } from 'react';
import '../src/App.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { getPetsPicturesForDisplay } from '../api';

const Home = () => {
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
    <div className="home-container">
      {/* {pictures?.length > 0 &&
        <Slide duration={2000} cssClass='main-pets-slider'>
          {pictures.map((image, index) => (
            <div key={index}>
              <img className='main-pets-slider-image' src={image} />
            </div>
          ))}
        </Slide>
      }
      <br /> */}
      <img src="https://images.squarespace-cdn.com/content/v1/55736dc1e4b0d0d0d20e29cb/1531443169811-4O2EMSJT4O06X6CUPBTC/PetMatch_Logo.png" alt="Petmatch Logo" className="home-image" />
    </div>
  );
};

export default Home;
