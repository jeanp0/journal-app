import React from "react";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";
import { rootRoute } from "../helpers/routes";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to={rootRoute} /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
