import React, { Component } from 'react';

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
      <div className="social-login" id={this.state.socialMedia}>
        <div className="contents">
          <img src={imgSrc} alt="this.socialMedia" />
          <div className="login-text">{loginText}</div>
        </div>
      </div>
    );
  }
}

export default SocialLogin;