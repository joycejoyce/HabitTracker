import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../../styles/index.scss";
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-exports.js';
import Home from './view/components/Home.js';
import Header from './view/Header.js';
import LoginHome from './view/LoginHome.js';
import Register from './view/components/Register.js';
import Login from './view/components/Login.js';
import NotFound404 from './view/NotFound404.js';
import User from './view/util/User.js';
import CreateHabitBuilder from './view/components/CreateHabitBuilder.js';

Amplify.configure(awsConfig);

class App extends Component {
  state = {
    user: null
  };

  render() {
    User.set(this.state.user);
    return (
      <div className="App">
        <Header />
        <Router>
            <Switch>
              <Route exact path="/index.html" component={ Register } />
              <Route path="/LoginHome" component={ LoginHome } />
              <Route path="/CreateHabitBuilder" component={ CreateHabitBuilder } />
              <Route path="/Register" component={ Register } />
              <Route path="/Login" component={ Login } />
              <Route component={ NotFound404 } />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;