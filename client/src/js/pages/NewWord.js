import React, { Component } from 'react';

class Word extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showDescription: false
    };

    this.setShowDescription = this.setShowDescription.bind(this);
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

  setShowDescription() {
    this.setState({showDescription: true});
  }

  setAnswer(correct) {
    console.log('setAnswer', correct, this.state.word);
    const wordId = this.state.word._id;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wordId,
        correct
      })
    };
    console.log('options', options);
    fetch('/api/user/word', options).then(response => console.log(response));
  }

  renderActions() {
    if (this.state.showDescription) {
      return (
        <div>
          <button className="button button-blue" onClick={() => this.setAnswer(true)}>Ja</button>
          <button className="button button-blue" onClick={() => this.setAnswer(false)}>Nej</button>
        </div>
      )
    } else {
      return(
        <button className="button button-blue" onClick={this.setShowDescription}>Visa förklaring</button>
      )
    }
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
      <div className="new-word">
        <div className="do-you-know">
          Kan du ordet?
        </div>
        <header className="word-container">
          <h1 className="word-name">{name}</h1>
        </header>
        {this.state.showDescription &&
          <section className="word-information">
            <div className="word-description">
              {description}
            </div>
            <div className="word-inflection">
              {inflection}
            </div>
          </section>
        }
        <section className="word-actions">
          {this.renderActions()}
        </section>
      </div>
    );
  }
}

export default Word;
