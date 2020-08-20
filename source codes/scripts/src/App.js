import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../../styles/index.scss";
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-exports.js';
import CreatePage from './view/Create.js';
import Home from './view/Home.js';
import LoginHome from './view/LoginHome.js';
import Register from './view/Register.js';
import Login from './view/Login.js';
import NavBar from './view/NavBar.js';
import NotFound404 from './view/NotFound404.js';

Amplify.configure(awsConfig);

class App extends Component {
  state = {
    user: null
  };

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} />
        <Router>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/LoginHome" component={ LoginHome } />
              <Route path="/Create" component={ CreatePage } />
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