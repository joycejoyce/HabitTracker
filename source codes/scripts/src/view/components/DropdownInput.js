import React, { Component } from 'react';
import changeState from "@dorith1989/my-pkg";

class DropdownInput extends Component {
  state = {
    dropdown: {
      display: "none"
    }
  }

  handleClickInput = async () => {
    console.log("(before)display: " + this.state.dropdown.display);
    if(this.state.dropdown.display === "block") {
      changeState(this, "dropdown", "display", "none");
    }
    else {
      changeState(this, "dropdown", "display", "block");
    }
    console.log("(after)display: " + this.state.dropdown.display);
  }

  handleInputChange = (e) => {
    changeState(this, "dropdown", "display", "none");
    this.props.onChange(e);
  }

  handleClickOption = (opt) => {
    changeState(this, "dropdown", "display", "none");
    this.props.onClick(this.props.ctrl.name, opt);
  }

  render() {
    const dropdownDisplay = {
      display: this.state.dropdown.display
    };
    const BASIC_CLASSNAME = "dropdownInput";
    const className = this.props.ctrl.name + " " + BASIC_CLASSNAME;
    const TEXT_CLASSNAME = BASIC_CLASSNAME + "__text";
    const LIST_CLASSNAME = BASIC_CLASSNAME + "__list";
    const ITEM_CLASSNAME = BASIC_CLASSNAME + "__item";

    return (
        <div className={className}>
            <input className={TEXT_CLASSNAME}
              type="text"
              onChange={(e) => this.handleInputChange(e)}
              onClick={this.handleClickInput}
              name={this.props.ctrl.name}
              value={this.props.ctrl.value}
              autoComplete="off"
            />
            <div className={LIST_CLASSNAME} style={dropdownDisplay}>
              {
                this.props.ctrl.options.map(opt =>
                  (<div className={ITEM_CLASSNAME}
                    key={opt}
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

export default DropdownInput;