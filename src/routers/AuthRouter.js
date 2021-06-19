import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { loginAuthRoute, registerAuthRoute } from "../helpers/routes";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route path={loginAuthRoute} component={LoginScreen} />
          <Route path={registerAuthRoute} component={RegisterScreen} />
          <Redirect to={loginAuthRoute} />
        </Switch>
      </div>
    </div>
  );
};
