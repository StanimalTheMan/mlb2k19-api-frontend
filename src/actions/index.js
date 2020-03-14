import history from "../history";
import { FETCH_BATTER, FETCH_PITCHER } from "./types";
import axios from "axios";

export const fetchBatter = formValues => async dispatch => {
  axios
    .get("http://localhost:3000/batting/player", {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName
      }
    })
    .then(
      json => dispatch({ type: FETCH_BATTER, payload: json.data }),
      history.push(
        `/batting/player?firstname=${formValues.firstName}&lastname=${formValues.lastName}`
      )
    );
};

export const fetchPitcher = formValues => async dispatch => {
  axios
    .get("http://localhost:3000/pitching/player", {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName
      }
    })
    .then(
      json => dispatch({ type: FETCH_PITCHER, payload: json.data }),
      history.push(
        `/pitching/player?firstname=${formValues.firstName}&lastname=${formValues.lastName}`
      )
    );
};
