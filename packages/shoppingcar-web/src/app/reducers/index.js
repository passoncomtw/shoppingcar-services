import { combineReducers } from 'redux';
import merchantReducer from './merchantReducer';
import authReducer from './authReduer';

const appReducer = combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
