import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import Assets from "../../util/Assets.js";

class SocialRegister extends Component {
  signIn = async () => {
    console.log("Enter signIn");

    const response = await Auth.federatedSignIn();
    console.log({response});
    
    console.log("Exit signIn");
  }

  render() {
    console.log("Enter SocialRegister");
    const googleSrc = Assets.get({name: "google"});
    const twitterSrc = Assets.get({name: "twitter"});
    const fbSrc = Assets.get({name: "facebook"});

    return (
      <div className="socialRegister">
        <div className="socialRegister__text">Or you can join with</div>
        <div className="socialRegister__imgs">
          <img src={googleSrc} />
          <img src={twitterSrc} />
          <img src={fbSrc} onClick={this.signIn} />
        </div>
      </div>
    );
  }
}

export default SocialRegister;