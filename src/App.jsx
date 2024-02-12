import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import UserProfileComponent from '../components/UserProfileComponent';
import PetProfileComponent from '../components/PetProfileComponent';
import MatchManagementComponent from '../components/MatchManagementComponent';
import AboutComponent from '../components/AboutComponent';
import HomeComponent from '../components/HomeComponent';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/auth" element={<AuthComponent/>} />
        <Route path="/profile" element={<UserProfileComponent/>} />
        <Route path="/pet-profile" element={<PetProfileComponent/>} />
        <Route path="/match" element={<MatchManagementComponent/>} />
        <Route path="/about" element= {<AboutComponent/>} />
    </Routes>
  );
}

export default App;