import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import "./PlayerShow.css";
import { fetchPitcher } from "../../actions/";

class PitcherShow extends React.Component {
  renderTableData(stats) {
    return stats.players.map((statsEntry, index) => {
      const {
        playerID,
        yearID,
        teamID,
        lgID,
        W,
        L,
        ERA,
        SO,
        WHIP,
      } = statsEntry;
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

  renderTableHeader(stats) {
    const all_header = Object.keys(stats.players[0]);
    const relevant_fields = [
      "playerID",
      "yearID",
      "teamID",
      "lgID",
      "W",
      "L",
      "ERA",
      "SO",
      "WHIP",
    ];
    const relevant_header = all_header.filter((header) => {
      return relevant_fields.includes(header);
    });
    return relevant_header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  componentDidMount() {
    const search = this.props.location.search;
    const urlSearchParams = new URLSearchParams(search);
    this.props.fetchPitcher({
      firstName: urlSearchParams.get("firstname"),
      lastName: urlSearchParams.get("lastname"),
    });
  }

  render() {
    if (!_.isEmpty(this.props.pitcher)) {
      const stats = this.props.pitcher;
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
        You have come to this page without submitting the pitcher's form.
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pitcher: state.players,
  };
};

export default connect(mapStateToProps, { fetchPitcher })(PitcherShow);
