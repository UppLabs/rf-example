import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, REGISTRATION, REGISTRATION_ERROR } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case REGISTRATION:
      return { ...state, registration: action.payload };
    case REGISTRATION_ERROR:
      return { ...state, error: action.payload };
    default:
      break;
  }
  return state;
}