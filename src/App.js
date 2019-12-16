import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <h1>Know if your favorite baseball player may no longer be playing!</h1>
      </div>
    );
  }
}

export default () => (
  <div>
     <Router>
          <Route component={App} />
     </Router>
 </div>
);
