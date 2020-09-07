import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import Validate from "../util/FormValidator.js";
import Field from "./Field.js";
import { FormErrors } from "../util/FormErrors.js";
import Assets from "../util/Assets.js";

class Register extends Component {
  render() {
    return(
      <div className="register">
        <RegisterForm />
        <SocialRegister />
        <LoginSection />
      </div>
    );
  }
}

class RegisterForm extends Component {
  state = {
    valid: false,
    registerSuccess: false,
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
      email: {
        label: "Email",
        name: "email",
        value: "",
        type: "email",
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
      },
      confirmPassword: {
        label: "Confirm Password",
        name: "confirmPassword",
        value: "",
        type: "password",
        valid: false,
        error: ""
      }
    }
  };

  handleFieldChange = async (e) => {
    const { name, value, type } = e.target;
    const field = { name, value, type };
    await this.changeValue(field);
    this.validate(field);
  }

  changeValue = async (field) => {
    const { name, value } = field;
    await this.changeField(name, value, "value");
  }

  changeField = async (name, value, prop) => {
    const fields = this.state.fields;
    fields[name] = { ...this.state.fields[name], [prop]: value};
    await this.setState({ fields });
  }

  validate = (field) => {
    const error = Validate(field);
    this.changeField(field.name, error, "error");
  }

  async handleSubmit(e) {
    e.preventDefault();

    const valid = this.isFormValid();
    console.log({valid});
    if(!valid) {
      return;
    }

    const fields = this.state.fields;
    const username = fields.username.value;
    const password = fields.password.value;
    const email = fields.email.value;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log({signUpResponse});
      //To-do: jump to other page
    } catch(error) {
      const err = error.message ? error.message : error;
      console.log({err});
      this.setState({ 
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  isFormValid = () => {
    const fields = this.state.fields;
    const valid = Object.keys(fields).reduce((acc, fieldName) => {
      const isFieldValid = !(fields[fieldName].error);
      return acc && isFieldValid;
    }, true);
    return valid;
  }

  render() {
    const onChange = this.handleFieldChange;
    const fields = this.state.fields;
    return (
      <form className="registerForm">
        <FormErrors errors={this.state.errors} />
        <div className="registerForm__fields">
          <Field ctrl={fields.username} onChange={onChange} />
          <Field ctrl={fields.email} onChange={onChange} />
          <Field ctrl={fields.password} onChange={onChange} />
          <Field ctrl={fields.confirmPassword} onChange={onChange} />
        </div>
        <button className="registerForm__submit" onClick={(e) => this.handleSubmit(e)}>Register</button>
      </form>
    );
  }
}

class SocialRegister extends Component {
  render() {
    const googleSrc = Assets.get({name: "google"});
    const twitterSrc = Assets.get({name: "twitter"});
    const fbSrc = Assets.get({name: "facebook"});

    return (
      <div className="socialRegister">
        <div className="socialRegister__text">Or you can join with</div>
        <div className="socialRegister__imgs">
          <img src={googleSrc} />
          <img src={twitterSrc} />
          <img src={fbSrc} />
        </div>
      </div>
    );
  }
}

class LoginSection extends Component {
  render() {
    return (
      <div className="loginSection">
        <div className="loginSection__text">Already have an account?</div>
        <div className="loginSection__login">Login</div>
      </div>
    );
  }
}

export default Register;