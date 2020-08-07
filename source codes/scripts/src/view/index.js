import { ComponentRender } from "./component-render.js";
import "../../../styles/index.scss";
import Amplify from 'aws-amplify';
import userPoolConfig from '../config.json';
import awsConfig from '../config.json';

const config = {
  ...awsConfig,
  Auth: {
    mandatorySignId: true,
    region: userPoolConfig.cognito.REGION,
    userPoolId: userPoolConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: userPoolConfig.cognito.APP_CLIENT_ID
  }
};

Amplify.configure(config);

/*Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});*/

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