import React from "react";

function FormErrors(props) {
  const errors = props.errors;
  const styles = getStyles(errors);
  return (
    <div className="form-errors" style={styles}>
      { Object.keys(errors).map(key => 
        <div className="error" key={key}>
          <img src="../../assets/warning.svg" alt="warning" />
          <div className="msg">{errors[key]}</div>
        </div>
      )}
    </div>
  );
}

function getStyles(errors) {
  const hasErrors = Object.values(errors).filter(error => error ? true : false).length > 0 ? true : false;
  const display = hasErrors ? "block" : "none";
  const styles = { display };
  return styles;
}

const Errors = {
  WrongEmailFormat: "Incorrect email format",
  BlankField: "This field is required",
  AtLeast8Chars: "Password should be at least 8 characters",
  ConfirmPwdNotMatch: "Confirm password doesn't match password"
};

export { FormErrors, Errors };