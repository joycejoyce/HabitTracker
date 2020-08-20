import React, { Component } from 'react';

class Quote extends Component {
  render() {
    const asset = {name: "quote", type: "svg"};
    return (
      <section className="quote">
        <img className="pre-quote" src={AssetGetter(asset)} alt="quote" />
        <div className="quote-text">Chains of habit are too light to be felt until they are too heavy to be broken.</div>
        <img className="post-quote" src={AssetGetter(asset)} alt="quote" />
        <div className="quote-person">- Warren Buffett</div>
      </section>
    );
  }
}

export default Quote;