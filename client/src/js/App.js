import React from 'react';
import {
  BrowserRouter as Router,
  Link,
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
        <div>
          <Link to="/">Home</Link>
          <Link to="/user/word">Nytt Ord</Link>
          <Link to="/user/mywords">Mina Ord</Link>

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
