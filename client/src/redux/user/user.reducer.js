import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  user: undefined,
  error: null,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN:
    case userActionTypes.SIGN_UP:
      return { ...state, user: action.payload, error: null };
    case userActionTypes.SIGN_OUT:
      return { ...state, user: null, error: null };
    case userActionTypes.ERROR:
      return { ...state, user: null, error: action.payload };
    case userActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case userActionTypes.LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
