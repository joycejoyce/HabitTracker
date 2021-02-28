import React, { Component } from 'react';
import User from './util/User.js';

class NavbarMenu extends Component {
  render() {
    const isLogin = User.isLogin();
    if(!isLogin) {
      return (
        <LoginBtn />
      );
    }
    else {
      return (
        <LoginMenu />
      )
    }
    
  }
}

class LoginBtn extends Component {
  render() {
    return (
      <button className="loginBtn">Login</button>
    );
  }
}

class LoginMenu extends Component {
  render() {
    return (
      <img id="create-habit-builder-icon" src={AssetGetter(createBtnIcon)} alt="create-habit-builder-icon" />
      <img id="account-icon" src={AssetGetter(accountIcon)} alt="account-icon" />
    );
  }
}

export default LoginDisplaySection;