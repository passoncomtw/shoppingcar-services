import { combineReducers } from "redux";
import authReducer from "./authReducer";
import merchantReducer from "./merchantReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import shoppingcarReducer from "./shoppingcarReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  user: userReducer,
  product: productReducer,
  merchant: merchantReducer,
  shoppingcar: shoppingcarReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
