import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuth = true,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => {
      return isAuth ? <Component {...props} /> : <Redirect to='/' />;
    }}
  />
);

export default PrivateRoute;
