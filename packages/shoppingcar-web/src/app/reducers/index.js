import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import authReducer from './authReduer';

const appReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
