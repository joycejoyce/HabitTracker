import React, { Component } from 'react';
import Assets from "../../util/Assets.js";

class CheckEmail extends Component {
  getMailSrc = () => {
    return Assets.get({ name: "mail" });
  }

  goToHome = () => {
    this.props.history.push("/home");
  }

  render() {
    const email = {
      value: "dorith1989@gmail.com"
    }
    console.log("(CheckEmail)email", email);

    const mailSrc = this.getMailSrc();
    
    return(
      <div className="checkEmail">
        <div className="contents">
          <div className="title">
            <img className="mail" src={mailSrc} />
            <h1>Please check your email</h1>
          </div>
          <div className="line"></div>
          <div className="text">
            <div className="lineOfText">A verification link has been</div>
            <div className="lineOfText">sent to your email account</div>
            <div className="email">{email.value}</div>
          </div>
        </div>
        <button className="goHomeBtn" onClick={this.goToHome}>Go to home page</button>
      </div>
    );
  }
}

export default CheckEmail;