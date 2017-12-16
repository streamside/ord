import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';
import NewWord from './pages/NewWord';
import MyWords from './pages/MyWords'
import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="ui container">
          <div className="header">Ord</div>
          <nav className="ui secondary pointing menu">
            <NavLink exact to="/" activeClassName="active" className="item">Home</NavLink>
            <NavLink to="/user/word" activeClassName="active" className="item">Nytt Ord</NavLink>
            <NavLink to="/user/mywords" activeClassName="active" className="item" data-badge="1">
              <span className="mdl-badge" data-badge="4">Mina Ord</span>
            </NavLink>
          </nav>

          <Switch>
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route path="/user/word" component={NewWord} />
            <Route path="/user/mywords" component={MyWords} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
