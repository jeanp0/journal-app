import { types } from "../components/types/types";

export const startLoginWithEmailPassword = (email, password) => {
  // thunk ofrece el dispath(?)
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, "Jeanpier"));
    }, 3500);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});
