import _ from "lodash";
import { FETCH_BATTER, FETCH_PITCHER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BATTER:
      return { ...state, players: action.payload };
    case FETCH_PITCHER:
      return { ...state, players: action.payload };
    default:
      return state;
  }
};
