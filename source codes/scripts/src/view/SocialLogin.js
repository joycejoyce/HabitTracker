import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
//test add start
/*import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports.js';
Amplify.configure(awsconfig);*/
//test add end

class SocialLogin extends Component {
  state = {
    socialMedia: this.props.name
  };

  getImgSrc = () => {
    return "../../../assets/" + this.state.socialMedia + ".svg";
  }

  getLoginText = () => {
    return "Login with " + this.state.socialMedia;
  }
  
  render() {
    const imgSrc = this.getImgSrc();
    const loginText = this.getLoginText();
    return(
      <div className="social-login" id={this.state.socialMedia} onClick={ () => Auth.federatedSignIn({provider: 'Facebook'}) }>
        <div className="contents">
          <img src={imgSrc} alt="this.socialMedia" />
          <div className="login-text">{loginText}</div>
        </div>
      </div>
    );
  }
}

export default SocialLogin;