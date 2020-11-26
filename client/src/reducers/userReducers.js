import { LOGOUT, LOGIN_USER, REGISTER_USER } from '../types/userConstants'

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload
    case REGISTER_USER:
      return action.payload
    case LOGOUT:
      return action.payload
    default:
      return state
  }
}
