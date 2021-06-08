import { types } from "../components/types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase.config";

// hace de middleware
export const startLoginWithEmailPassword = (email, password) => {
  // thunk ofrece el dispath(?)
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, "Jeanpier"));
    }, 3500);
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});
