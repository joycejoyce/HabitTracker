import React, { Component } from 'react';
import User from './util/User.js';

class LoginOrRegister extends Component {
  render() {
    const isLogin = User.isLogin();
    if(isLogin) {
      return (
        <LoginBtn />
      );
    }
    else {
      return (
        <RegisterBtn />
      )
    }
    
  }
}

class LoginBtn extends Component {
  
}

export default LogingOrRegister;