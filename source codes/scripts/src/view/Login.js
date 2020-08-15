import React, { Component } from 'react';
import { Auth } from "aws-amplify";
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
    }
  };

  render() {
    const onChange = this.handleFieldChange;
    const fields = this.state.fields;
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
          <SocialLogin name="facebook" />
          <SocialLogin name="google" />
          <SocialLogin name="twitter" />
      </form>
    );
  }
}

export default Login;