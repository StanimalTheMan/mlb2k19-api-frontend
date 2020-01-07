import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import BatterNameForm from './components/BatterNameForm/BatterNameForm';
import PitcherNameForm from './components/PitcherNameForm/PitcherNameForm';
import HofNameForm from './components/HofNameForm/HofNameForm';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

const routing = (
    <Router>
        <div id="links">
            <ul className="f4 pa2 w-70 center">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/batting">Batters</Link>
                </li>
                <li>
                    <Link to="/pitching">Pitchers</Link>
                </li>
                <li>
                    <Link to="/hof">Hall Of Fame</Link>
                </li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/batting" component={BatterNameForm} />
            <Route path="/pitching" component={PitcherNameForm} />
            <Route path="/hof" component={HofNameForm} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
