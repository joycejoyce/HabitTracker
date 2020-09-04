import { Errors } from "./FormErrors.js";

let password = null;

function validate(input) {
  const { type } = input;
  let regex = null;
  let error = null;

  switch(type) {
    case "email":
      error = validateEmail(input);
      break;
    case "password":
      error = validatePassword(input);
      break;
    case "text":
      error = validateText(input);
      break;
    default:
      console.error(`Unexpected type: ${type}`);
      break;
  }
  
  return error;
}

function validateEmail(field) {
  const { value } = field;
  const regex = /.+@.+/;
  let error = null;

  if(!regex.test(value)) {
    error = Errors.WrongEmailFormat;
  }

  return error;
}

function validatePassword(field) {
  const { name, value } = field;
  let error = null;

  switch(name) {
    case "password":
      setPassword(value);
      const regex = /.{8}/;
      if(!regex.test(value)) {
        error = Errors.AtLeast8Chars;
      }
      break;
    case "confirmPassword":
      if(value !== password) {
        error = Errors.ConfirmPwdNotMatch;
      }
      break;
    default:
      console.error(`Unexpected name: ${name}`) ;
      break;
  }

  return error;
}

function validateText(field) {
  const { value } = field;
  let error = null;

  if(!value || value.length == 0) {
    error = Errors.BlankField;
  }

  return error;
}

function setPassword(value) {
  password = value;
}

export default validate;