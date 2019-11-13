import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import BatterNameForm from '../BatterNameForm/BatterNameForm';

class BatterAPI extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this.battingButtonOnClick = this.battingButtonOnClick.bind(this);
  }

  battingButtonOnClick() {
    this.props.history.push('/batting');
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className="BatterAPI">
        <Logo />
        <div className="container">
          { this.state.show ? <button id="batting" onClick={this.battingButtonOnClick}>Batting Stats</button> : null}
          <Route path="/batting" component={BatterNameForm}/>
  
        </div>
      </div>
    );
  }
}

export default () => (
  <div>
     <Router>
          <Route component={BatterAPI} />
     </Router>
 </div>
);