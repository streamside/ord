import React, { Component } from 'react';

const defaultState = {
  isLoading: true,
  showDescription: false,
  word: null
};

class Word extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;

    this.setShowDescription = this.setShowDescription.bind(this);
    this.getNextWord = this.getNextWord.bind(this);
  }

  componentDidMount() {
    this.getNextWord();
  }

  getNextWord() {
    console.log('About to get next word', this);
    this.setState(defaultState);
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
    fetch('/api/user/word', options)
      .then(response => console.log(response))
      .then(this.getNextWord);
  }

  renderActions() {
    if (this.state.showDescription) {
      return (
        <div>
          <div className="answer-action-text">Kunde du ordet?</div>
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
      return (
        <div className="ui active loader" />
      );
    }

    const {
      name,
      description,
      inflection
    } = this.state.word;

    return (
      <div className="new-word">
        <div className="do-you-know">
          Ditt nya ord:
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
