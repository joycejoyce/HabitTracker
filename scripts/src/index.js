//import { ComponentRender } from "./view/component-render.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(<App />, document.getElementById("root"));

//Amplify.configure(awsConfig);

/*
Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

window.addEventListener("load", () => {
  ComponentRender.renderAll();
});*/

window.addEventListener("click", e => {
  const $dropdown = $(".dropdown-input");
  if(!$dropdown.is(e.target) && $dropdown.has(e.target).length == 0) {
    hideDropdownWhenClickOutside(e);
  }
});

function hideDropdownWhenClickOutside(event) {
  const lists = Array.from(document.querySelectorAll(".dropdown-list"));
  lists.forEach(list => list.style.display = "none");
}