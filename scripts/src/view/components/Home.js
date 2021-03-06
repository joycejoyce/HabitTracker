import React, { Component } from 'react';
import User from '../util/User.js';
import Quote from './Quote.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Quote className="home__quote" quoteText={Quote.TEXT.Aristotle_We} />
        <Link to="/Register">
          <button className="home__joinBtn">Join Habit Builder</button>
        </Link>
      </div>
    );
  }
}

export default Home;