import { types } from "../components/types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase.config";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { cleanNotesLogout } from "./notes";

// acción que hace de middleware
export const startLoginWithEmailPassword = (email, password) => {
  // thunk ofrece el dispath(?)
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(finishLoading());
        Swal.fire("Error", err.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      // autentica automáticamente
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", err.message, "error");
      });
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

export const startLogout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logout());
        dispatch(cleanNotesLogout());
      });
  };
};

export const logout = () => ({
  type: types.logout,
});
