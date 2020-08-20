import React, { Component } from 'react';
import { AssetGetter } from './util/AssetGetter.js';

class NavBar extends Component {
  state = {
    
  };

  render() {
    const createBtnIcon = {name: "plus_sign", type: "svg"};
    const accountIcon = {name: "person", type: "svg"};
    const user = this.props.user;
    return(
      <header class="grid">
        <h1>Habit<br />Builder</h1>
        {
          if(user == null) {

          }
        }
        <img id="create-habit-builder-icon" src={AssetGetter(createBtnIcon)} alt="create-habit-builder-icon" />
        <img id="account-icon" src={AssetGetter(accountIcon)} alt="account-icon" />
      </header>
    );
  }
}

export default NavBar;