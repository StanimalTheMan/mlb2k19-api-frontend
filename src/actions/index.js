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
      // trying to deal with names like DJ LeMahieu
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
      // trying to deal with names like Jacob deGrom and Travis d'Arnaud
      params: {
        firstname: firstName.charAt(0) + firstName.slice(1).toLowerCase(),
        lastname:
          lastName.slice(0, 2).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase(),
      },
    }
  );

  const requestFour = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // trying to deal with names like Ryan McMahon and Jeff McNeil
      params: {
        firstname: firstName.charAt(0) + firstName.slice(1).toLowerCase(),
        lastname:
          lastName.charAt(0) +
          lastName.charAt(1).toLowerCase() +
          lastName.charAt(2) +
          lastName.slice(3).toLowerCase(),
      },
    }
  );

  const requestFive = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // trying to deal with names like Hyun-Jin Ryu
      params: {
        firstname:
          firstName.charAt(0) +
          firstName.slice(1, 4).toLowerCase() +
          firstName.slice(4, 6) +
          firstName.slice(6).toLowerCase(),
        lastname: lastName.charAt(0) + lastName.slice(1).toLowerCase(),
      },
    }
  );

  const requestSix = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      // trying to deal with names like CC Sabathia
      params: {
        firstname: firstName,
        lastname: lastName.charAt(0) + lastName.slice(1).toLowerCase(),
      },
    }
  );

  //  open to take into account other names TBD (hard to match all kinds of names such as de La Rosa as opposed to De la Rosa as oppposed to J. D. Davis)
  //  will at the moment make users accountable for inputtign exact name as it is in database (needs improvement)

  const requestGeneral = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/batting/player",
    {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
      },
    }
  );

  axios
    .all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
      requestSix,
      requestGeneral,
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];
        const responseFive = responses[4];
        const responseSix = responses[5];
        const responseGeneral = responses[6];

        const toDispatch = responseOne.data.length
          ? responseOne
          : responseTwo.data.length
          ? responseTwo
          : responseThree.data.length
          ? responseThree
          : responseFour.data.length
          ? responseFour
          : responseFive.data.length
          ? responseFive
          : responseSix.data.length
          ? responseSix
          : responseGeneral;

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
        } else if (toDispatch === responseThree) {
          firstName = firstName.charAt(0) + firstName.slice(1).toLowerCase();
          lastName =
            lastName.slice(0, 2).toLowerCase() +
            lastName.charAt(2) +
            lastName.slice(3).toLowerCase();
        } else if (toDispatch === responseFour) {
          firstName = firstName.charAt(0) + firstName.slice(1).toLowerCase();
          lastName =
            lastName.charAt(0) +
            lastName.charAt(1).toLowerCase() +
            lastName.charAt(2) +
            lastName.slice(3).toLowerCase();
        } else if (toDispatch === responseFive) {
          firstName =
            firstName.charAt(0) +
            firstName.slice(1, 4).toLowerCase() +
            firstName.slice(4, 6) +
            firstName.slice(6).toLowerCase();
          lastName = lastName.charAt(0) + lastName.slice(1).toLowerCase();
        } else if (toDispatch === responseSix) {
          lastName = lastName.charAt(0) + lastName.slice(1).toLowerCase();
        } else {
          firstName = formValues.firstName;
          lastName = formValues.lastName;
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
      // standard queries like Shane Bieber
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

  const requestThree = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      // trying to deal with names like Collin McHugh
      params: {
        firstname: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastname:
          lastName.charAt(0).toUpperCase() +
          lastName.charAt(1) +
          lastName.charAt(2).toUpperCase() +
          lastName.slice(3),
      },
    }
  );

  const requestFour = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      // trying to deal with names like CC Sabathia
      params: {
        firstname: firstName.toUpperCase(),
        lastname: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      },
    }
  );

  const requestFive = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      // trying to deal with names like Hyun-Jin Ryu (although it might not be user friendly to mandate the - in Hyun-Jin from users)
      params: {
        firstname:
          firstName.charAt(0).toUpperCase() +
          firstName.slice(1, 5) +
          firstName.charAt(5).toUpperCase() +
          firstName.slice(6),
        lastname: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      },
    }
  );

  //  open to take into account other names TBD (hard to match all kinds of names such as de La Rosa as opposed to De la Rosa as oppposed to J. D. Davis)
  //  will at the moment make users accountable for inputtign exact name as it is in database (needs improvement)
  const requestGeneral = axios.get(
    "https://nameless-scrubland-88143.herokuapp.com/pitching/player",
    {
      params: {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
      },
    }
  );

  axios
    .all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
      requestGeneral,
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];
        const responseFive = responses[4];
        const responseGeneral = responses[5];

        const toDispatch = responseOne.data.length
          ? responseOne
          : responseTwo.data.length
          ? responseTwo
          : responseThree.data.length
          ? responseThree
          : responseFour.data.length
          ? responseFour
          : responseFive.data.length
          ? responseFive
          : responseGeneral;

        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        if (toDispatch === responseOne) {
          lastName = formValues.lastName.replace(/\s/g, "").toLowerCase();
          lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        } else if (toDispatch === responseTwo) {
          lastName =
            lastName.slice(0, 2) +
            lastName.charAt(2).toUpperCase() +
            lastName.slice(3);
        } else if (toDispatch === responseThree) {
          lastName =
            lastName.charAt(0).toUpperCase() +
            lastName.charAt(1) +
            lastName.charAt(2).toUpperCase() +
            lastName.slice(3);
        } else if (toDispatch === responseFour) {
          firstName = firstName.toUpperCase();
          lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        } else if (toDispatch === responseFive) {
          firstName =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1, 5) +
            firstName.charAt(5).toUpperCase() +
            firstName.slice(6);
          lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        } else {
          firstName = formValues.firstName;
          lastName = formValues.lastName;
        }

        dispatch({ type: FETCH_PITCHER, payload: toDispatch.data });
        history.push(
          `/pitching/player?firstname=${firstName}&lastname=${lastName}`
        );
      })
    );
};
