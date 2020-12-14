// import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchBatter } from "../../actions/";
import PlayerForm from "./PlayerForm";

class BatterForm extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
    console.log("Adfadf", this.props);
    this.props.fetchBatter(formValues);
  };

  render() {
    return (
      <div>
        <h3>Enter a batter's name</h3>
        <PlayerForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    batter: state.players,
  };
};

export default connect(mapStateToProps, { fetchBatter })(BatterForm);
