import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import BatterAPI from './components/BatterAPI/BatterAPI';
import PitcherAPI from './components/PitcherAPI/PitcherAPI';
//import PlayerNameForm from './components/PlayerNameForm/PlayerNameForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <BatterAPI />
        <PitcherAPI />
      </div>
    );
  }
}

export default App;
