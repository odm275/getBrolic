import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../auth/Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Auth.Consumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </Auth.Consumer>
);

export default ProtectedRoute;
