import { CreatePage } from "./create-page.js";
import { HomePage } from "./home-page.js";

const React = require("react");
const ReactDOM = require("react-dom");

class ComponentRender {
  static renderAll() {
    this.renderCreatePage();
    this.renderHomePage();
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
}

export { ComponentRender }