import {CHOOSE_RESTAURANT} from './type'

export const chooseRestaurant = (restaurant) => ({
  type: CHOOSE_RESTAURANT,
  payload: restaurant
});