import { combineReducers } from 'redux';

import currentRestaurantReducer from './currentRestaurantReducer'

export default combineReducers({
  currentRestaurant: currentRestaurantReducer
});