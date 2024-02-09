import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import UserProfileComponent from './components/UserProfileComponent';
import PetProfileComponent from './components/PetProfileComponent';
import MatchManagementComponent from './components/MatchManagementComponent';
import AboutComponent from './components/AboutComponent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={AuthComponent} />
        <Route exact path="/profile" component={UserProfileComponent} />
        <Route exact path="/pet-profile" component={PetProfileComponent} />
        <Route exact path="/match" component={MatchManagementComponent} />
        <Route exact path="/about" component={AboutComponent} />
      </Switch>
    </Router>
  );
}

export default App;