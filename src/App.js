import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Components/Task';
import Test from './Components/Test';
import Test2 from './Components/Test2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Test2/>
      </div>
    );
  }
}

export default App;