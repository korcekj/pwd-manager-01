import { fleshMessageActionTypes } from './flash-message.types';

export const hideMessage = () => ({
  type: fleshMessageActionTypes.HIDE_MESSAGE
});

export const showMessage = () => ({
  type: fleshMessageActionTypes.SHOW_MESSAGE
});

export const setMessage = (data = {}) => ({
  type: fleshMessageActionTypes.SET_MESSAGE,
  payload: data
});
