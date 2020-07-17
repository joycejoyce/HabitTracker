import changeState from "@dorith1989/my-pkg";
import FormValidator from "@dorith1989/form-validator";

const React = require("react");

class CreateForm extends React.Component {
  constructor() {
    super();

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      valid: false,
      inputs: {
        days: {
          value: "",
          valid: false
        },
        habit: {
          value: "",
          valid: false
        }
      },
      eventHandlers: {
        onChange: this.handleChangeInput,
        onSubmit: this.handleSubmit
      }
    };
  }

  handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    changeState(this, "inputs", name, "value", value);
    
    const valid = this.validate(name, value);
    changeState(this, name, "valid", valid);
  }

  validate(name, value) {
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

  handleSubmit() {

  }

  render() {
    console.log("days = ", this.state.inputs.days.value);
    return (
      <form id="create-habit-tracker">
        <h1>Create a Habit Tracker</h1>
        <p>
          I will use &nbsp;<Day inputs={this.state.inputs} eventHandlers={this.state.eventHandlers} /> &nbsp;days to<br />
          build a daily habit: &nbsp;<Habit inputs={this.state.inputs} eventHandlers={this.state.eventHandlers} />
        </p>
        <input type="submit" value="Create" onClick={this.state.eventHandlers.onSubmit} />
      </form>
    );
  }
}

class Day extends React.Component {
  render() {
    return (
      <input type="text"
        name="days"
        placeholder=""
        autoComplete="off"
        value={this.props.inputs.days.value}
        onChange={this.props.eventHandlers.onChange}
      />
    );
  }
}

class Habit extends React.Component {
  render() {
    return (
      <input type="text"
        name="habit"
        placeholder=""
        autoComplete="off"
        value={this.props.inputs.habit.value}
        onChange={this.props.eventHandlers.onChange}
      />
    );
  }
}

export { CreateForm }