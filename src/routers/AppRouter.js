import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase.config";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { baseAuthRoute, rootRoute, loginAuthRoute } from "../helpers/routes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // observable
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user?.uid) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }
      // preserva el state del auth con la acción login
      dispatch(login(user.uid, user.displayName));
      setIsAuthenticated(true);
      dispatch(startLoadingNotes(user.uid));
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
            path={baseAuthRoute}
            component={AuthRouter}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={rootRoute}
            component={JournalScreen}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to={loginAuthRoute} />
        </Switch>
      </div>
    </Router>
  );
};
