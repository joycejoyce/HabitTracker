import changeState from "@dorith1989/my-pkg";
import FormValidator from "@dorith1989/form-validator";
import {AssetGetter} from "./assets-getter.js";

const React = require("react");

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="contents">
        <Quote />
        <CheckList />
      </div>
    );
  }
}

class Quote extends React.Component {
  render() {
    const asset = {name: "quote", type: "svg"};
    return (
      <section className="quote">
        <img className="pre-quote" src={AssetGetter(asset)} alt="quote" />
        
        <img className="post-quote" src={AssetGetter(asset)} alt="quote" />
      </section>
    );
  }
}

class CheckList extends React.Component {
  render() {
    return(
      <section className="check-list">
        
      </section>
    );
  }
}
 
export { Home }