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
          <div className="ord-header">Ord</div>
          <nav className="ui secondary pointing menu">
            <NavLink exact to="/" activeClassName="active" className="item">
              <i className="ti ti-house"/>
              Home
            </NavLink>
            <NavLink to="/user/word" activeClassName="active" className="item">
              <i className="ti ti-tag" />
              Nytt Ord
            </NavLink>
            <NavLink to="/user/mywords" activeClassName="active" className="item">
              <i className="ti ti-message" />
              Mina Ord
            </NavLink>
            <NavLink to="/user/badges" activeClassName="active" className="item">
              <i className="ti ti-trophy" />
              Badges
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
