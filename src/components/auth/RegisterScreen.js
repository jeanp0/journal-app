import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { loginAuthRoute } from "../../helpers/routes";
import { useForm } from "../../hooks/useForm";
import {
  isNotValid,
  isRequired,
  shouldBeAtLeast,
  shouldBeMatch,
} from "../../messages/errors";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  // useSelector, obtener el state de la aplicación (redux)
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: "Jeanpier",
    email: "jeanpier@mendoza.com",
    password: "123456",
    password2: "123456",
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError(isRequired("Name")));
      return false;
    }
    if (!validator.isEmail(email)) {
      dispatch(setError(isNotValid("Email")));
      return false;
    }
    if (password.length < 6) {
      dispatch(setError(shouldBeAtLeast("Password", 6)));
      return false;
    }
    if (password !== password2) {
      dispatch(setError(shouldBeMatch("Password")));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleRegister}
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link" to={loginAuthRoute}>
          Already register?
        </Link>
      </form>
    </>
  );
};
