import { createSelector } from 'reselect';

const selectFlashMessage = state => state.flashMessage;

export const selectMessage = createSelector(
  [selectFlashMessage],
  flashMessage => flashMessage.message
);

export const selectHidden = createSelector(
  [selectFlashMessage],
  flashMessage => flashMessage.hidden
);

export const selectType = createSelector(
  [selectFlashMessage],
  flashMessage => flashMessage.type
);

export const selectTimeout = createSelector(
  [selectFlashMessage],
  flashMessage => flashMessage.timeout
);
