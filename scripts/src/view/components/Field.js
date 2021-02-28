import React, { Component } from 'react';
import { FormErrors } from "../util/FormErrors.js";

class Field extends Component {
  render() {
    const { label, name, value, type, error } = this.props.ctrl;
    const errors = { error };
    const onChange = this.props.onChange;
    return (
      <div className="field">
        <FormErrors errors={errors} />
        <label className="field__label" htmlFor={name}>{label}</label>
        <input className="field__input" 
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e)} />
      </div>
    );
  }
}

export default Field;