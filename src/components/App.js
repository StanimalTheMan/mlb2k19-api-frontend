import React from "react";
import { Router, Route } from "react-router-dom";
import BatterForm from "./mlbdata/BatterForm";
import PitcherForm from "./mlbdata/PitcherForm";
import BatterShow from "./mlbdata/BatterShow";
import PitcherShow from "../components/mlbdata/PitcherShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <h1 className="title">
        Find out when a player last played as of end of 2019 season and get some
        stats too!
      </h1>
      <Router history={history}>
        <Header />
        <Route path="/batting" exact component={BatterForm} />
        <Route path="/pitching" exact component={PitcherForm} />
        <Route path="/batting/:formValues" exact component={BatterShow} />
        <Route path="/pitching/:formValues" exact component={PitcherShow} />
      </Router>
    </div>
  );
};

export default App;
