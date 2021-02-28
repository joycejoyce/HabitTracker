import React, { Component } from 'react';
import Assets from '../util/Assets.js';

class Quote extends Component {
  static DELIMITER = /\|/;

  static TEXT = {
    WarrenBuffett_Chains: "Warren Buffett|Chains of habit are too light to be felt until they are too heavy to be broken.",
    Aristotle_We: "Aristotle|We are what we repeatedly do."
  };

  getPerson = (quoteText) => {
    return quoteText.split(Quote.DELIMITER)[0];
  }
  
  getText = (quoteText) => {
    return quoteText.split(Quote.DELIMITER)[1];
  }

  render() {
    const quoteIcon = Assets.get({ name: "quote" });
    const person = this.getPerson(this.props.quoteText);
    const text = this.getText(this.props.quoteText);
    
    return (
      <div className={this.props.className+" quote"}>
        <div>
          <img className="quote__preQuote" src={quoteIcon} alt="pre quote" />
          <div className="quote__text">{text}</div>
          <img className="quote__postQuote" src={quoteIcon} alt="post quote" />
        </div>
        <div className="quote__person">- {person}</div>
      </div>
    );
  }
}

export default Quote;