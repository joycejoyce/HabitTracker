import { ComponentRender } from "./component-render.js";
import "../../../styles/index.scss";

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