import React, { Component } from 'react';
import changeState from "@dorith1989/my-pkg";
import FormValidator from "@dorith1989/form-validator";

class Create extends Component {
  state = {
    valid: false,
    inputs: {
      days: {
        name: "days",
        value: "",
        valid: false,
        options: [21, 30, 50, 100]
      },
      habit: {
        name: "habit",
        value: "",
        valid: false,
        options: ["exercise for 30 min",
                  "drink 2000 c.c. water",
                  "play piano for 10 min",
                  "coding for 15 min"]
      }
    },
    eventHandlers: {
      onChange: this.handleChangeInput,
      onSubmit: this.handleSubmit
    }
  }

  handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeState(this, "inputs", name, "value", value);
    
    const valid = this.validate(name, value);
    changeState(this, name, "valid", valid);
  }

  handleClickOptions = (name, value) => {
    const e = {
      target: {
        name,
        value
      }
    };

    this.handleChangeInput(e);
  }

  validate = (name, value) => {
    let valid;
    let type;
    switch(name) {
      case "days":
        type = FormValidator.VALIDATE_TYPE.isNumber;
        valid = FormValidator.validate(type, value);
        break;
      default:
        valid = true;
        break;
    }

    return valid;
  }

  handleSubmit = () => {

  }

  render() {
    return (
      <form className="create">
        <div className="create__line">
          I will use <DropdownInput className="days" ctrl={this.state.inputs.days} onClick={this.handleClickOptions} onChange={this.handleChangeInput} /> days to
        </div>
        <div className="create__line">
          build a daily habit:
        </div>
        <div className="create__line">
          <DropdownInput className="habit" ctrl={this.state.inputs.habit} onClick={this.handleClickOptions} onChange={this.handleChangeInput} />
        </div>
        <input className="create__submit" type="submit" value="Start from today" onClick={this.state.eventHandlers.onSubmit} />
      </form>
    );
  }
}

export default Create;