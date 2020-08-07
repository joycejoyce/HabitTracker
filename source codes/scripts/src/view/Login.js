import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import Validate from "./FormValidation.js";
import Field from "./Field.js";
import { FormErrors } from "./FormErrors.js";

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
          <div className="fields">
            <Field ctrl={fields.username} onChange={onChange} />
            <Field ctrl={fields.password} onChange={onChange} />
          </div>
          <button onClick={(e) => this.handleSubmit(e)}>Login</button>
          <div className="separator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>
          </div>
      </form>
    );
  }
}

export default Login;