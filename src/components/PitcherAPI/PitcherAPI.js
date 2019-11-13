import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import PitcherNameForm from '../PitcherNameForm/PitcherNameForm';

class PitcherAPI extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this.pitchingButtonOnClick = this.pitchingButtonOnClick.bind(this);
  }

  pitchingButtonOnClick() {
    this.props.history.push('/pitching');
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className="PitcherAPI">
        <Logo />
        <div className="container">
          { this.state.show ? <button id="batting" onClick={this.pitchingButtonOnClick}>Pitching Stats</button> : null}
          <Route path="/pitching" component={PitcherNameForm}/>
  
        </div>
      </div>
    );
  }
}

export default () => (
  <div>
     <Router>
          <Route component={PitcherAPI} />
     </Router>
 </div>
);