import changeState from "@dorith1989/my-pkg";
import FormValidator from "@dorith1989/form-validator";

const React = require("react");

class CreatePage extends React.Component {
  constructor() {
    super();

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
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
    };
  }

  handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    changeState(this, "inputs", name, "value", value);
    
    const valid = this.validate(name, value);
    changeState(this, name, "valid", valid);
  }

  handleClickOptions(name, value) {
    const e = {
      target: {
        name,
        value
      }
    };

    this.handleChangeInput(e);
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
    return (
      <form id="create">
        <div className="contents">
          <div className="line">
            I will use <DropdownInput className="days" ctrl={this.state.inputs.days} onClick={this.handleClickOptions} onChange={this.handleChangeInput} /> days to
          </div>
          <div className="line">
            build a daily habit:
          </div>
          <div className="line">
            <DropdownInput className="habit" ctrl={this.state.inputs.habit} onClick={this.handleClickOptions} onChange={this.handleChangeInput} />
          </div>
        </div>
        <input type="submit" value="Start from today" onClick={this.state.eventHandlers.onSubmit} />
      </form>
    );
  }
}

class DropdownInput extends React.Component {
  constructor() {
    super();
    this.state = {
      dropdown: {
        display: "none"
      }
    };

    this.handleClickInput = this.handleClickInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClickInput() {
    if(this.state.dropdown.display === "block") {
      changeState(this, "dropdown", "display", "none");
    }
    else {
      changeState(this, "dropdown", "display", "block");
    }
  }

  handleInputChange(e) {
    changeState(this, "dropdown", "display", "none");
    this.props.onChange(e);
  }

  handleClickOption(opt) {
    changeState(this, "dropdown", "display", "none");
    this.props.onClick(this.props.ctrl.name, opt);
  }

  render() {
    const dropdownDisplay = {
      display: this.state.dropdown.display
    };

    return (
        <div className={"dropdown-input " + this.props.ctrl.name}>
            <input type="text"
              onChange={(e) => this.handleInputChange(e)}
              onClick={this.handleClickInput}
              name={this.props.ctrl.name}
              value={this.props.ctrl.value}
              autoComplete="off"
            />
            <div className="dropdown-list" style={dropdownDisplay}>
              {
                this.props.ctrl.options.map(opt =>
                  (<div key={opt}
                    className="dropdown-item"
                    onClick={() => this.handleClickOption(opt)}>
                      {opt}
                  </div>)
                )
              }
            </div>
        </div>
    );
  }
}

export { CreatePage }