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
      <div className="summary ui three column grid">
        <div className="column">
          <div className="ui segment">
            <a className="ui blue ribbon label">Totalt</a>
            <div className="count">{statistics.total}</div>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a className="ui green ribbon label">Rätt</a>
            <div className="count">{statistics.correct}</div>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a className="ui red ribbon label">Fel</a>
            <div className="count">{statistics.incorrect}</div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="ui cards">
        <div className="ui card">
          <div className="content">
            <div className="header ui red circular label">
              {statistics.total}
            </div>
            <div className="description">
              Totalt antal ord
            </div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">
              {statistics.correct}
            </div>
            <div className="description">
              Rätt
            </div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">
              {statistics.incorrect}
            </div>
            <div className="description">
              Fel
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderWords() {
    return this.state.user.words.map(guess => {
      return (
        <tr key={guess._id}>
          <td>{guess.word.name}</td>
          <td>{guess.correct ? 'Ja' : 'Nej'}</td>
          <td>{guess.when}</td>
        </tr>
      )
    });
  }

  render() {
    if (this.state.isLoading) {
      return "Loading...";
    }

    return (
      <div className="my-words">
        <h2 className="ui header">
          Besvarade Ord
        </h2>
        {this.renderSummary()}
        <table className="ui very basic table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rätt</th>
              <th>När</th>
            </tr>
          </thead>
          <tbody>
          {this.renderWords()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MyWords;
