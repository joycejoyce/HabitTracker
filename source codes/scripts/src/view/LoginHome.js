import changeState from "@dorith1989/my-pkg";
import Quote from "./Quote.js";
import React from "react";

class LoginHome extends React.Component {
  constructor() {
    super();

    this.handleClickOnBtn = this.handleClickOnBtn.bind(this);

    this.state = {
      inputs: {
        exercise: {
          name: "exercise",
          value: "exercise for 30min",
          checked: false
        },
        water: {
          name: "water",
          value: "drink 2000c.c. water",
          checked: false
        },
        piano: {
          name: "piano",
          value: "play piano for 15 min",
          checked: false
        }
      }
    }
  }

  handleClickOnBtn(name) {
    const checked = !this.state.inputs[name].checked;
    changeState(this, "inputs", name, "checked", checked);
  }

  render() {
    return(
      <div className="contents">
        <Quote />
        <CheckList inputs={this.state.inputs} onClick={this.handleClickOnBtn} />
      </div>
    );
  }
}

class CheckList extends React.Component {
  render() {
    return(
      <section className="check-list">
        <div className="contents">
          <h1>Today I did:</h1>
          <div className="buttons">
            {
              Object.values(this.props.inputs).map(obj => {
                  const className = (obj.checked) ? "checked" : "";
                  return (
                    <button key={obj.name} className={className} onClick={() => this.props.onClick(obj.name)}>{obj.value}</button>
                  );
                }
              )
            }
          </div>
        </div>
      </section>
    );
  }
}

export default LoginHome;