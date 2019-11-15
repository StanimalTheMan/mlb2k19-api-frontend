import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './PitcherNameForm.css';
import axios from 'axios';

class PitcherNameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      stats: []
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event) {
    //this.props.history.push('/batting/player')
    event.preventDefault();
    axios.get('http://localhost:3000/pitching/player',
      {
        params: {firstname: this.firstNameInput.value, lastname: 
      this.lastNameInput.value}})
      .then(json => {this.setState({stats: json.data, show: !this.state.show})}
      ,
      this.props.history.push(`/pitching/player?firstname=${this.firstNameInput.value}&lastname=${this.lastNameInput.value}`));
  }

  render() {
    const stats = this.state.stats;
    let statsDisplay;
    if (stats.length !== 0) {
      statsDisplay = 
      <div>
      <h1 className='white'>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast}`}</h1>
            {this.state.stats.map((statsEntry, index) => 
              <li className='white' key={index}>{`PlayerID: ${statsEntry.playerID}`}&nbsp;&nbsp;&nbsp;{`Year: ${statsEntry.yearID}`}&nbsp;&nbsp;&nbsp;{`TeamID: ${statsEntry.teamID}`}&nbsp;&nbsp;&nbsp;{`League: ${statsEntry.lgID}`}&nbsp;&nbsp;&nbsp;{`W-L: ${statsEntry.W}-${statsEntry.L}`}&nbsp;&nbsp;&nbsp;{`ERA: ${statsEntry.ERA}`}&nbsp;&nbsp;&nbsp;{`SO: ${statsEntry.SO}`}&nbsp;&nbsp;&nbsp;{`WHIP: ${statsEntry.WHIP}`}</li>
            )}
            <h2>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast} last played in the MLB in ${this.state.stats[this.state.stats.length - 1].yearID}`}</h2>
    </div>;} else {
      statsDisplay = 
      <div>
        <p>Player does not exist.</p>
      </div>
    };
    return (
      <div className="PitcherForm">
        <Logo/>
        <div className="container">
          { this.state.show ? 
          <div>
            <p className='f3'>
              {'Enter both the first and last names of a MLB player: '} 
            </p>
            <form onSubmit={this.formSubmit}>
              <p className='f4 pa2 w-70 center'>
                {'First Name: '}
              </p>
              <input type='text' ref={(firstNameInput) => this.firstNameInput = firstNameInput} className='f4 pa2 w-70 center'/>
              <p className='f4 pa2 w-70 center'>
                {'Last Name: '}
              </p>
              <input type='text' ref={(lastNameInput) => this.lastNameInput = lastNameInput}  className='f4 pa2 w-70 center'/>
              <br></br>
              <br></br>
              <button className='w-30 grow f4 link ph3 pv'>Get Pitcher Stats!</button>
            </form>
          </div> 
          :
          <div>
            {statsDisplay}
          </div>} 
        </div>
      </div>
    );
  }
};

export default () => (
  <div>
     <Router>
          <Route component={PitcherNameForm} />
     </Router>
 </div>
);