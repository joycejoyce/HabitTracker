import { CreatePage } from "./create-page.js";
import { HomePage } from "./home-page.js";
import Register from "./Register.js";

const React = require("react");
const ReactDOM = require("react-dom");

class ComponentRender {
  static renderAll() {
    this.renderCreatePage();
    this.renderHomePage();
    this.renderRegister();
  }

  static renderCreatePage() {
    ReactDOM.render(
      <CreatePage />,
      document.querySelector("#create-page")
    );
  }

  static renderHomePage() {
    ReactDOM.render(
      <HomePage />,
      document.querySelector("#home-page")
    );
  }

  static renderRegister() {
    ReactDOM.render(
      <Register />,
      document.querySelector("#register")
    );
  }
}

export { ComponentRender }