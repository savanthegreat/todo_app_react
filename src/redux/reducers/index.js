import { combineReducers } from "redux";
import todoReducer from "./todoreducer";
import changeUser from "./userreducer";
export default combineReducers({
  todoReducer,
  changeUser,
});
