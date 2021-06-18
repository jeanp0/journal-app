import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase.config";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // observable
    firebase.auth().onAuthStateChanged((user) => {
      if (!user?.uid) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }
      // preserva el state del auth con la acción login
      dispatch(login(user.uid, user.displayName));
      setIsAuthenticated(true);
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsAuthenticated]);

  if (checking) {
    //waiting screen
    return <h1>Wait...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
