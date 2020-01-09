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
        params: {firstname: this.firstNameInput.value[0].toUpperCase() + this.firstNameInput.value.substr(1, this.firstNameInput.value.length).toLowerCase(), lastname:
        isOddName(this.lastNameInput.value) ? this.lastNameInput.value : this.lastNameInput.value[0].toUpperCase() + this.lastNameInput.value.substr(1, this.lastNameInput.value.length).toLowerCase()}})
      .then(json => {this.setState({stats: json.data, show: !this.state.show})}
      ,
      this.props.history.push(`/pitching/player?firstname=${this.firstNameInput.value[0].toUpperCase() + this.firstNameInput.value.substr(1, this.firstNameInput.value.length).toLowerCase()}&lastname=${this.lastNameInput.value[0].toUpperCase() + this.lastNameInput.value.substr(1, this.lastNameInput.value.length).toLowerCase()}`));
  }

  renderTableData() {
    return this.state.stats.map((statsEntry, index) => {
      const { playerID, yearID, teamID, lgID, W, L, ERA, SO, WHIP } = statsEntry;
      return (
        <tr key={index}>
          <td>{playerID}</td>
          <td>{yearID}</td>
          <td>{teamID}</td>
          <td>{lgID}</td>
          <td>{W}</td>
          <td>{L}</td>
          <td>{SO}</td>
          <td>{ERA}</td>
          <td>{WHIP}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    const all_header = Object.keys(this.state.stats[0]);
    const relevant_fields = ["playerID", "yearID", "teamID", "lgID", "W", "L", "ERA", "SO", "WHIP"]
    const relevant_header = all_header.filter((header) => {
      return relevant_fields.includes(header);
    });
    return relevant_header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    const stats = this.state.stats;
    let statsDisplay;
    if (stats.length !== 0) {
      statsDisplay = 
      <div>
        <h1 className='white'>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast}`}</h1>
        <table className="center" id="stats">
          <tbody className="white">
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <h2>{`${this.state.stats[0].nameFirst} ${this.state.stats[0].nameLast} last played in the MLB in ${this.state.stats[this.state.stats.length - 1].yearID}`}</h2>
    </div>;} else {
      statsDisplay = 
      <div>
        <p>Player does not exist.</p>
      </div>
    };
    return (
      <div className="PitcherForm">
        <Logo />
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

function isOddName(name) { // temporarily tests if name is like deGrom which is a valid name unlike rodRiguez. have to find a working solution
  return name === "deGrom";
}