import { combineReducers } from "redux";
import auth from "./authReducer";
import merchant from "./merchantReducer";
import order from "./orderReducer";
import product from "./productReducer";
import shoppingcar from "./shoppingcarReducer";

export default combineReducers({
  auth,
  order,
  merchant,
  product,
  shoppingcar,
});
