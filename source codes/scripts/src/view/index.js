import { ComponentRender } from "./component-render.js";
import "../../../styles/index.scss";
import Amplify from 'aws-amplify';
import config from '../config.json';

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
});

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