import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nutrition Data Visualizer</h2>
        </div>
        <div className="Main">
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
