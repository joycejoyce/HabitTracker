// react
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// auth-related
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports.js';

// components
import Header from './view/Header.js';
import LoginHome from './view/LoginHome.js';
import Register from './view/components/Register/Register.js';
import Login from './view/components/Login.js';
import NotFound404 from './view/NotFound404.js';
import CreateHabitBuilder from './view/components/CreateHabitBuilder.js';
import CheckEmail from './view/components/CheckEmail.js';

// scss
import "../../styles/index.scss";

Amplify.configure(awsConfig);

class App extends Component {
  state = {
    isAuenticated: false,
    user: null
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };

    return (
      <div className="App">
        <Header auth={authProps} />
          <Router>
            <Switch>
              <Route exact path="/" component={ Register } />
              <Route exact path="/checkEmail" component={ CheckEmail } />
              <Route path="/loginhome" component={ LoginHome } />
              <Route path="/createHabitBuilder" component={ CreateHabitBuilder } />
              <Route path="/login" component={ Login } />
              <Route component={ NotFound404 } />
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;