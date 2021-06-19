import React from "react";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";
import { loginAuthRoute } from "../helpers/routes";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={loginAuthRoute} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
