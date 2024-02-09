import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import UserProfileComponent from './UserProfileComponent';
import PetProfileComponent from './PetProfileComponent';
import MatchManagementComponent from './MatchManagementComponent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={AuthComponent} />
        <Route exact path="/profile" component={UserProfileComponent} />
        <Route exact path="/pet-profile" component={PetProfileComponent} />
        <Route exact path="/match" component={MatchManagementComponent} />
      </Switch>
    </Router>
  );
}

export default App;