import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';

const ProtectedRoute = ({component: Component, innerProps, ...other}) => {
  return (
    <Route {...other} render={props => (
      Auth.isAuthenticated() ? (
        <Component {...innerProps} {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
  );
};

export default withRouter(ProtectedRoute);
