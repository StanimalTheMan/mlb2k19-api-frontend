import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './BatterNameForm.css';
import axios from 'axios';

class BatterNameForm extends Component {

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
    axios.get('http://localhost:3000/batting/player',
      {
        params: {firstname: this.firstNameInput.value, lastname: 
      this.lastNameInput.value}})
      .then(json => {this.setState({stats: json.data, show: !this.state.show})}
      ,
      this.props.history.push(`/batting/player?firstname=${this.firstNameInput.value}&lastname=${this.lastNameInput.value}`));
  }

  render() {
    return (
      <div className="BatterForm">
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
              <button className='w-30 grow f4 link ph3 pv'>Get Batter Stats!</button>
            </form>
          </div> 
          :
          <div>
            <h1 className='white'>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast}`}</h1>
            {this.state.stats.map((statsEntry, index) => 
              <li className='white' key={index}>{`PlayerID: ${statsEntry.playerID}`}&nbsp;&nbsp;&nbsp;{`Year: ${statsEntry.yearID}`}&nbsp;&nbsp;&nbsp;{`TeamID: ${statsEntry.teamID}`}&nbsp;&nbsp;&nbsp;{`League: ${statsEntry.lgID}`}&nbsp;&nbsp;&nbsp;{`HR: ${statsEntry.HR}`}&nbsp;&nbsp;&nbsp;{`RBI: ${statsEntry.RBI}`}&nbsp;&nbsp;&nbsp;{`AVG: ${(statsEntry.H / statsEntry.AB).toFixed(3)}`}</li>
            )}
            <h2>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast} last played in the MLB in ${this.state.stats[this.state.stats.length - 1].yearID}`}</h2>
          </div>} 
        </div>
      </div>
    );
  }
};

export default () => (
  <div>
     <Router>
          <Route component={BatterNameForm} />
     </Router>
 </div>
);