import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import "./PlayerShow.css";

class BatterShow extends React.Component {
  renderTableData(stats) {
    return stats.players.map((statsEntry, index) => {
      const {
        playerID,
        yearID,
        teamID,
        lgID,
        HR,
        RBI,
        AVG,
        OBP,
        SB,
      } = statsEntry;
      return (
        <tr key={index}>
          <td>{playerID}</td>
          <td>{yearID}</td>
          <td>{teamID}</td>
          <td>{lgID}</td>
          <td>{HR}</td>
          <td>{RBI}</td>
          <td>{AVG}</td>
          <td>{OBP}</td>
          <td>{SB}</td>
        </tr>
      );
    });
  }

  renderTableHeader(stats) {
    const all_header = Object.keys(stats.players[0]);
    const relevant_fields = [
      "playerID",
      "yearID",
      "teamID",
      "lgID",
      "HR",
      "RBI",
      "AVG",
      "OBP",
      "SB",
    ];
    const relevant_header = all_header.filter((header) => {
      return relevant_fields.includes(header);
    });
    return relevant_header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    if (!_.isEmpty(this.props.batter)) {
      const stats = this.props.batter;
      let statsDisplay;
      if (stats.players.length !== 0) {
        statsDisplay = (
          <div>
            <h1 className="white">{`${stats.players[0].nameFirst} ${stats.players[0].nameLast}`}</h1>
            <h2>{`${stats.players[0].nameFirst} ${
              stats.players[0].nameLast
            } last played in the MLB in ${stats.players.reduce(
              (max, cur) => Math.max(max, cur.yearID),
              stats.players[0].yearID
            )}`}</h2>
            <table className="center" id="stats">
              <tbody className="white">
                <tr>{this.renderTableHeader(stats)}</tr>
                {this.renderTableData(stats)}
              </tbody>
            </table>
          </div>
        );
      } else {
        statsDisplay = (
          <div>
            <p>Player does not exist.</p>
          </div>
        );
      }
      return <div>{statsDisplay}</div>;
    }
    return (
      <div>
        You have come to this page without submitting the batter's form.
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    batter: state.players,
  };
};

export default connect(mapStateToProps, null)(BatterShow);
