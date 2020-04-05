import history from "../history";
import { FETCH_BATTER, FETCH_PITCHER } from "./types";
import axios from "axios";

//use local host in get if you want to run app locally
export const fetchBatter = (formValues) => async (dispatch) => {
  axios
    .get("https://nameless-scrubland-88143.herokuapp.com/batting/player", {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
      },
    })
    .then(
      (json) => dispatch({ type: FETCH_BATTER, payload: json.data }),
      history.push(
        `/batting/player?firstname=${formValues.firstName}&lastname=${formValues.lastName}`
      )
    );
};

export const fetchPitcher = (formValues) => async (dispatch) => {
  axios
    .get("https://nameless-scrubland-88143.herokuapp.com/pitching/player", {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
      },
    })
    .then(
      (json) => dispatch({ type: FETCH_PITCHER, payload: json.data }),
      history.push(
        `/pitching/player?firstname=${formValues.firstName}&lastname=${formValues.lastName}`
      )
    );
};
