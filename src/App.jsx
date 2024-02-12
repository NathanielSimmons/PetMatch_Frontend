import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import UserProfileComponent from '../components/UserProfileComponent';
import PetProfileComponent from '../components/PetProfileComponent';
import MatchManagementComponent from '../components/MatchManagementComponent';
import AboutComponent from '../components/AboutComponent';
import HomeComponent from '../components/HomeComponent';
import NavBarComponent from '../components/NavBarComponent';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Handle logout logic, such as clearing local storage, etc.
    setIsLoggedIn(false);
  };

const App = () => {
  return (
    <div>
    <NavBarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/auth" element={<AuthComponent/>} />
        <Route path="/profile" element={<UserProfileComponent/>} />
        <Route path="/pet-profile" element={<PetProfileComponent/>} />
        <Route path="/match" element={<MatchManagementComponent/>} />
        <Route path="/about" element= {<AboutComponent/>} />
    </Routes>
    </div>
  );
}

export default App;