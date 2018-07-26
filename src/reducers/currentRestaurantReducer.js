import { CHOOSE_RESTAURANT } from '../actions/type'

export default function (state = null, action) {
  switch (action.type) {
    case CHOOSE_RESTAURANT:
      return action.payload

    default:
      return state;
  }
} 