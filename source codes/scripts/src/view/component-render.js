import { CreateForm } from "./create-habit-tracker-form.js";

const React = require("react");
const ReactDOM = require("react-dom");

class ComponentRender {
  static renderAll() {
    this.renderCreateForm();
  }

  static renderCreateForm() {
    ReactDOM.render(
      <CreateForm />,
      document.querySelector("#create-habit-tracker-form")
    );
  }
}

export { ComponentRender }