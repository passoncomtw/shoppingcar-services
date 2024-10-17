import { combineReducers } from "redux";
import authReducer from "./authReduer";
import merchantReducer from "./merchantReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  merchant: merchantReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
