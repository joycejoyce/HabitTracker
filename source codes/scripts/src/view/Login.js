import React, { Component } from 'react';
import { Auth, Hub } from "aws-amplify";
import Validate from "./FormValidation.js";
import Field from "./Field.js";
import { FormErrors } from "./FormErrors.js";
import SocialLogin from "./SocialLogin.js";

class Login extends Component {
  state = {
    errors: {},
    fields: {
      username: {
        label: "User Name",
        name: "username",
        value: "",
        type: "text",
        valid: false,
        error: ""
      },
      password: {
        label: "Password",
        name: "password",
        value: "",
        type: "password",
        valid: false,
        error: ""
      }
    },
    user: null,
    customState: null,
  };

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

  render() {
    const onChange = this.handleFieldChange;
    const fields = this.state.fields;
    const { user } = this.state;
    const username = (user == null)? "" : user.getUsername();
    return (
      <form className="login">
          <FormErrors errors={this.state.errors} />
          <div className="user-info">
            <div className="fields">
              <Field ctrl={fields.username} onChange={onChange} />
              <Field ctrl={fields.password} onChange={onChange} />
            </div>
            <div className="forget-pwd">Forget Password?</div>
          </div>
          <button onClick={(e) => this.handleSubmit(e)}>Login</button>
          <div className="separator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>
          </div>
          <SocialLogin name="facebook" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} />
          <SocialLogin name="google" />
          <SocialLogin name="twitter" />
          <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
          <button onClick={() => Auth.signOut()}>Sign Out {username}</button>
      </form>
    );
  }
}

export default Login;