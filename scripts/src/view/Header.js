import React, { Component } from 'react';
import Assets from './util/Assets.js'
import User from './util/User.js'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Logo className="header__logo" />
        <Navbar className="header__navbar" />
      </header>
    );
  }
}

class Logo extends Component {
  render() {
    return(
      <h1 className="header__logo__h1">Habit<br />Builder</h1>
    );
  }
}

class Navbar extends Component {
  render() {
    const isLogin = User.isLogin();
    if(!isLogin) {
      return (
        <button className="header__navbar__loginBtn">Login</button>
      );
    }
    else {
      const createIconSrc = Assets.get({ name: 'plus_sign' });
      const accountIconSrc = Assets.get({ name: 'person' });
      return (
        <nav className="header__navbar__nav">
          <ul className="header__navbar__ul">
            <li><img className="header__navbar__ul__img" src={createIconSrc} alt="create habit builder" /></li>
            <li><img className="header__navbar__ul__img" src={accountIconSrc} alt="my account" /></li>
          </ul>
        </nav>
      )
    }
  }
}

export default Header;