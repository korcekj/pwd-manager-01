import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.user
);

export const selectError = createSelector([selectUser], ({ error }) => error);

export const selectIsLoading = createSelector(
  [selectUser],
  ({ isLoading }) => isLoading
);
