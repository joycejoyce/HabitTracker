import React, { Component } from 'react';
import RegisterForm from './RegisterForm.js';
import SocialRegister from './SocialRegister.js';
import LoginSection from './LoginSection.js';

class Register extends Component {
  render() {
    return(
      <div className="register">
        <RegisterForm />
        <SocialRegister />
        <LoginSection />
      </div>
    );
  }
}

export default Register;