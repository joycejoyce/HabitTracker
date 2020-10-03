import React, { Component } from 'react';
import RegisterForm from './RegisterForm.js';
import SocialRegister from './SocialRegister.js';
import LoginSection from './LoginSection.js';
import { Auth } from "aws-amplify";

class Register extends Component {
  checkUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
  }

  signOut = async () => {
    const response = await Auth.signOut();
    console.log("response: ", response);
  }

  render() {
    return(
      <div className="register">
        <RegisterForm />
        <SocialRegister />
        <LoginSection />
        <button onClick={this.checkUser}>Current User</button>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default Register;