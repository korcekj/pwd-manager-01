import { userActionTypes } from './user.types';
import axios from 'axios';

export const signIn = (user = {}) => ({
  type: userActionTypes.SIGN_IN,
  payload: user,
});

export const signUp = (user = {}) => ({
  type: userActionTypes.SIGN_UP,
  payload: user,
});

export const signOut = () => ({
  type: userActionTypes.SIGN_OUT,
});

export const setError = (error) => ({
  type: userActionTypes.ERROR,
  payload: error,
});

export const clearError = () => ({
  type: userActionTypes.CLEAR_ERROR,
});

export const trySignIn = () => async (dispatch) => {
  try {
    const { data: user } = await axios.get('/auth/me', {
      withCredentials: true,
    });
    dispatch(signIn(user));
  } catch (e) {
    const { response } = e;

    if (response) dispatch(setError(response.data));
    else dispatch(setError('Error occured'));
  }
};

export const startSignIn = (credentials = {}) => async (dispatch) => {
  try {
    await axios.post('/auth/signin', credentials, {
      withCredentials: true,
    });
    dispatch(trySignIn());
  } catch (e) {
    const { response } = e;

    if (response) dispatch(setError(response.data));
    else dispatch(setError('Error occured'));
  }
};

export const startSignUp = (userData = {}) => async (dispatch) => {
  try {
    const user = await axios.post('/auth/signup', userData, {
      withCredentials: true,
    });
    dispatch(trySignIn());
  } catch (e) {
    const { response } = e;

    if (response) dispatch(setError(response.data));
    else dispatch(setError('Error occured'));
  }
};

export const startSignOut = () => async (dispatch) => {
  try {
    await axios.post('/auth/signout', {
      withCredentials: true,
    });
    dispatch(signOut());
  } catch (e) {
    dispatch(setError('Nepodarilo sa úspešne odhlásiť'));
  }
};
