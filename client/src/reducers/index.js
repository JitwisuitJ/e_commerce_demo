import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import productReducer from './product';
import cartReducer from './cart';

export default combineReducers({
  authReducer,
  alertReducer,
  productReducer,
  cartReducer
});
