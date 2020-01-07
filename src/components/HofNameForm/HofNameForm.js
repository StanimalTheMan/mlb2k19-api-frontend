import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './HofNameForm.css';
import axios from 'axios';

class HofNameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      hofData: []
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event) {
    //this.props.history.push('/batting/player')
    event.preventDefault();
    axios.get('http://localhost:3000/hof/player',
      {
        params: {firstname: this.firstNameInput.value, lastname: 
      this.lastNameInput.value}})
      .then(json => {this.setState({hofData: json.data, show: !this.state.show})}
      ,
      this.props.history.push(`/hof/player?firstname=${this.firstNameInput.value}&lastname=${this.lastNameInput.value}`));
  }

  render() {
    const data = this.state.hofData;
    let hofDataDisplay;
    if (data.length !== 0) {
      hofDataDisplay = 
      <div>
        <h2>{`${this.state.hofData[0].nameFirst} ${this.state.hofData[0].nameLast} is in the MLB Hall of Fame as of the end of the 2018 season and was inducted in ${this.state.hofData[this.state.hofData.length - 1].yearid}.`}</h2>
    </div>;} else {
      hofDataDisplay = 
      <div>
        <p>Player does not exist or is not in the Hall of Fame as of the end of the 2018 season.</p>
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
            {hofDataDisplay}
          </div>} 
        </div>
        
      </div>
    );
  }
};

export default () => (
  <div>
     <Router>
          <Route component={HofNameForm} />
     </Router>
 </div>
);