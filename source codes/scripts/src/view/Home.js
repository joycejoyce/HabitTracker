import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    
  };

  render() {
    return (
      <div className="home">
        <Link to="/LoginHome">Login Home</Link>
      </div>
    );
  }
}

export default Home;