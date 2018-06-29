import React, { Component } from 'react';
import './App.css';
import Task from './Components/Task';
import Register from './Components/Register';
import Reset from './Components/Reset';
import Login from './Components/Login';
import { Switch, Route } from 'react-router-dom';
import firebase from './Components/config';
import MenuApp from './Components/MenuApp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      }
      else {
        this.setState({ user: null });
        // localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Task" component={Task} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Reset" component={Reset} />
          <Route exact path="/Home" component={MenuApp} />
        </Switch>

      </div>
    );
  }
}

export default App;
