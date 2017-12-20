import React from 'react';

class MyWords extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    console.log('About to make words request');
    fetch('/api/user')
      .then(response => response.json())
      .then(user => {
        console.log('Get user information', user);
        this.setState({
          user,
          isLoading: false
        });
      });
  }

  getStats() {
    const total = this.state.user.words.length;
    const correct = this.state.user.words.filter(guess => guess.correct).length;
    const incorrect = this.state.user.words.filter(guess => !guess.correct).length;

    return {
      total,
      correct,
      incorrect
    };
  }

  renderSummary() {
    const statistics = this.getStats();

    return (
      <div className="summary">
        <div className="count">{statistics.correct}</div>
        <div className="collected-words">ord samlade</div>
      </div>
    );
  }

  renderWordTile(guess) {
    return (
      <div className="ui piled segment" key={guess._id}>
        <h2 className="ui header">{guess.word.name}</h2>
        <div className="description">
          {guess.word.description}
        </div>
      </div>
    );
  }

  renderWords() {
    const correct = this.state.user.words.filter(guess => guess.correct);

    const col1 = correct.filter((guess, index) => index % 3 === 0)
      .map(this.renderWordTile);
    const col2 = correct.filter((guess, index) => index % 3 === 1)
      .map(this.renderWordTile);
    const col3 = correct.filter((guess, index) => index % 3 === 2)
      .map(this.renderWordTile);

    return (
      <div className="all-words ui stackable three column grid">
        <div className="column">
          {col1}
        </div>
        <div className="column">
          {col2}
        </div>
        <div className="column">
          {col3}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return "Loading...";
    }

    return (
      <div className="my-words">
        {this.renderSummary()}
        {this.renderWords()}
      </div>
    )
  }
}

export default MyWords;
