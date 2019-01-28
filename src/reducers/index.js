import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userOrdersReducers from './userOrdersReducer';
import singleOrderReducers from './singleOrder';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  userOrders: userOrdersReducers,
  singleOrder: singleOrderReducers,
});
