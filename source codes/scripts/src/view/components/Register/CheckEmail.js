import React, { Component } from 'react';
import Assets from "../../util/Assets.js";

class CheckEmail extends Component {
  getStarSrc = () => {
    return Assets.get({ name: "star" });
  }

  render() {
    console.log("(CheckEmail)email", email);

    const starSrc = this.getStarSrc();
    
    return(
      <div className="checkEmail">
        <img src={starSrc} />
        <h1>Please check your email</h1>
        <div className="checkEmail__line"></div>
        <div className="checkEmail__text">
          <div className="lineOfText">A verification link has been</div>
          <div className="lineOfText">sent to your email account</div>
          <div className="lineOfText">A verification link has been</div>
    <div className="email">{email.value}</div>
        </div>
      </div>
    );
  }
}

export default CheckEmail;