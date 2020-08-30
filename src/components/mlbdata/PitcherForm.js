// import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPitcher } from "../../actions/";
import PlayerForm from "./PlayerForm";

class PitcherForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.fetchPitcher(formValues);
  };

  render() {
    return (
      <div>
        <h3>Enter a pitcher's name</h3>
        <PlayerForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pitcher: state.players,
  };
};

export default connect(mapStateToProps, { fetchPitcher })(PitcherForm);
