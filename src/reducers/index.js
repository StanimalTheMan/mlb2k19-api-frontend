import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import playerReducer from "./playerReducer";

export default combineReducers({
  form: formReducer,
  players: playerReducer
});
