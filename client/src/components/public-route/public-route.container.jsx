import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuth = false,
  component: Component,
  altComponent: AltComponent,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => {
      return isAuth ? <Redirect to='/dashboard' /> : <Component {...props} />;
    }}
  />
);

export default PublicRoute;
