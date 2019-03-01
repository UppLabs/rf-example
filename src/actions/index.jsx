import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
  UNAUTHENTICATED,
  REGISTRATION,
  REGISTRATION_ERROR
} from './types';

import axios from 'axios';


export function signInAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/account/signin/', { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('token', res.data.token);
      history.push('/elements');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export function signUpAction({UserName, Email, Password}, history) {
  return async (dispatch) => {

    try {
      const res = await axios.post('/api/account/signup', {UserName, Email, Password});
      dispatch({type: REGISTRATION});
      history.push('/signin');
    } catch (error) {
      dispatch({
        type: REGISTRATION_ERROR,
        payload: 'Registration error, please try again'
      });
    }

  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}