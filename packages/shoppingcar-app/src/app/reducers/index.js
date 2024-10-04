import { combineReducers } from "redux";
import auth from "./authReducer";
import merchant from "./merchantReducer";

export default combineReducers({
  auth,
  merchant,
});
