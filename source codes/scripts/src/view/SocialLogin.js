import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';

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
    const { user } = this.state;
    return(
      <div className="social-login" id={this.state.socialMedia} onClick={this.props.onClick}>
        <div className="contents">
          <img src={imgSrc} alt="this.socialMedia" />
          <div className="login-text">{loginText}</div>
        </div>
      </div>
    );
  }
}

export default SocialLogin;