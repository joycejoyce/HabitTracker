import React from "react";

function FormErrors(props) {
  const errors = props.errors;
  return (
    <div className="form-errors">
      { Object.keys(errors).map(key => <div className="error" key={key}>{errors[key]}</div>) }
    </div>
  );
}

const Errors = {
  WrongEmailFormat: "Incorrect email format",
  BlankField: "This field is required",
  AtLeast8Chars: "Password should be at least 8 characters",
  ConfirmPwdNotMatch: "Confirm password doesn't match password"
};

export { FormErrors, Errors };