// Importovanie potrebnych packages
import { combineReducers } from 'redux';

// Importovanie reducers
import userReducer from './user/user.reducer';
import flashMessageReducer from './flash-message/flash-message.reducer';

// Vytvorenie root reducer, ktory bude obsahovat jednotlive reducers ako napriklad pouzivatel, moduly a flashMessage
const rootReducer = combineReducers({
  user: userReducer,
  flashMessage: flashMessageReducer,
});

// Exportovanie root reducer
export default rootReducer;
