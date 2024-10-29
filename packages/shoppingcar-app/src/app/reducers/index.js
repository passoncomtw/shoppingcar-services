import { combineReducers } from "redux";
import auth from "./authReducer";
import merchant from "./merchantReducer";
import product from "./productReducer";
import order from "./orderReducer";

export default combineReducers({
  auth,
  order,
  merchant,
  product,
});
