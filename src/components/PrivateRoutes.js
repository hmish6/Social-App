import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isAuth')
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute;