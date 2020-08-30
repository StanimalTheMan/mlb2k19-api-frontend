import history from "../history";
import { FETCH_BATTER, FETCH_PITCHER } from "./types";
import axios from "axios";

//use local host in get if you want to run app locally
export const fetchBatter = (formValues) => async (dispatch) => {
  let firstName = formValues.firstName.replace(/\s/g, "").toLowerCase();
  let lastName = formValues.lastName.replace(/\s/g, "").toLowerCase();

  const requestOne = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // standard queries like Mike Trout
      params: {
        firstname: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastname: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      },
    }
  );

  firstName = formValues.firstName.replace(/\s/g, "").toUpperCase();
  lastName = formValues.lastName.replace(/\s/g, "").toUpperCase();

  const requestTwo = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // trying to deal with name DJ LeMahieu
      params: {
        firstname: firstName,
        lastname:
          lastName.charAt(0) +
          lastName.charAt(1).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase(),
      },
    }
  );

  const requestThree = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // trying to deal with name Jacob deGrom
      params: {
        firstname: firstName.charAt(0) + firstName.slice(1).toLowerCase(),
        lastname:
          lastName.slice(0, 2).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase(),
      },
    }
  );

  //  open to take into account other names TBD

  axios.all([requestOne, requestTwo, requestThree]).then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responseThree = responses[2];

      const toDispatch = responseOne.data.length
        ? responseOne
        : responseTwo.data.length
        ? responseTwo
        : responseThree;

      if (toDispatch === responseOne) {
        firstName = formValues.firstName.replace(/\s/g, "").toLowerCase();
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        lastName = formValues.lastName.replace(/\s/g, "").toLowerCase();
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      } else if (toDispatch === responseTwo) {
        firstName = formValues.firstName.replace(/\s/g, "").toUpperCase();
        lastName = formValues.lastName.replace(/\s/g, "").toUpperCase();
        lastName =
          lastName.charAt(0) +
          lastName.charAt(1).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase();
      } else {
        firstName = firstName.charAt(0) + firstName.slice(1).toLowerCase();
        lastName =
          lastName.slice(0, 2).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase();
      }
      dispatch({ type: FETCH_BATTER, payload: toDispatch.data });
      history.push(
        `/batting/player?firstname=${firstName}&lastname=${lastName}`
      );
    })
  );
};

export const fetchPitcher = (formValues) => async (dispatch) => {
  let firstName = formValues.firstName.replace(/\s/g, "").toLowerCase();
  let lastName = formValues.lastName.replace(/\s/g, "").toLowerCase();

  const requestOne = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      // standard queries like Mike Trout
      params: {
        firstname: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastname: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      },
    }
  );

  const requestTwo = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      // trying to deal with name Jacob deGrom
      params: {
        firstname: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastname:
          lastName.slice(0, 2) +
          lastName.charAt(2).toUpperCase() +
          lastName.slice(3),
      },
    }
  );

  //  open to take into account other names TBD

  axios.all([requestOne, requestTwo]).then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];

      const toDispatch = responseOne.data.length ? responseOne : responseTwo;

      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      if (toDispatch === responseOne) {
        lastName = formValues.lastName.replace(/\s/g, "").toLowerCase();
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      } else {
        lastName =
          lastName.slice(0, 2) +
          lastName.charAt(2).toUpperCase() +
          lastName.slice(3);
      }

      dispatch({ type: FETCH_PITCHER, payload: toDispatch.data });
      history.push(
        `/pitching/player?firstname=${firstName}&lastname=${lastName}`
      );
    })
  );
};
