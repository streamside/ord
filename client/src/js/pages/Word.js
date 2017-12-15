import React, { Component } from 'react';

class Word extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    console.log('About to make words request');
    fetch('/api/user/word')
      .then(response => response.json())
      .then(word => {
        console.log('get word', word);
        this.setState({
          word,
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return "Loading...";
    }

    const {
      name,
      description,
      inflection
    } = this.state.word;

    return (
      <div className="word">
        <header className="word-container">
          <h1 className="word-name">{name}</h1>
        </header>
        <section className="word-information">
          <div className="word-description">
            {description}
          </div>
          <div className="word-inflection">
            {inflection}
          </div>
        </section>
        <section className="word-actions">
          <button className="button button-red">Visa förklaring</button>
        </section>
      </div>
    );
  }
}

export default Word;
