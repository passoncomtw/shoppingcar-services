import { combineReducers } from "redux";
import auth from "./authReducer";
import merchant from "./merchantReducer";
import product from "./productReducer";

export default combineReducers({
  auth,
  merchant,
  product,
});
