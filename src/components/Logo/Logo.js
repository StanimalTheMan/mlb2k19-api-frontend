import React from 'react';
import Tilt from 'react-tilt';
import mlblogo from './mlblogo.jpg'
import './Logo.css';

const Logo = () => {
  return (
    <div className='mt4 mt0'>
      <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner"><img alt='logo' src={mlblogo}/></div>
      </Tilt>
    </div>
  );
}

export default Logo;