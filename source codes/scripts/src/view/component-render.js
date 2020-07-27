import { CreateForm } from "./create-form.js";
import { Home } from "./home.js";

const React = require("react");
const ReactDOM = require("react-dom");

class ComponentRender {
  static renderAll() {
    this.renderCreateForm();
    this.renderHome();
  }

  static renderCreateForm() {
    ReactDOM.render(
      <CreateForm />,
      document.querySelector("#create-form")
    );
  }

  static renderHome() {
    ReactDOM.render(
      <Home />,
      document.querySelector("#home")
    );
  }
}

export { ComponentRender }