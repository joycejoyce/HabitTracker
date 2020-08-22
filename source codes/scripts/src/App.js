import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../../styles/index.scss";
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-exports.js';
import CreatePage from './view/Create.js';
import Home from './view/Home.js';
import Header from './view/Header.js';
import LoginHome from './view/LoginHome.js';
import Register from './view/Register.js';
import Login from './view/Login.js';
import NotFound404 from './view/NotFound404.js';

Amplify.configure(awsConfig);

class App extends Component {
  state = {
    user: "a"
  };

  render() {
    console.log("Enter App()");
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Router>
            <Switch>
              <Route exact path="/index.html" component={ Home } />
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