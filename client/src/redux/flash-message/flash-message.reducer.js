import { fleshMessageActionTypes } from './flash-message.types';

const INITIAL_STATE = {
  message: null,
  type: 'info',
  hidden: true,
  timeout: 8000
};

const flashMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case fleshMessageActionTypes.SHOW_MESSAGE:
      return { ...state, hidden: false };
    case fleshMessageActionTypes.HIDE_MESSAGE:
      return { ...state, hidden: true };
    case fleshMessageActionTypes.SET_MESSAGE:
      return { ...state, hidden: false, ...action.payload };
    default:
      return state;
  }
};

export default flashMessageReducer;
