import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import {
  isNotValid,
  isRequired,
  shouldBeAtLeast,
  shouldBeMatch,
} from "../../messages/errors";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    name: "Jeanpier",
    email: "jeanpier@mendoza.com",
    password: "12345",
    password2: "12345",
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()) {
      console.log("form correct");
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
    if (password.length < 5) {
      dispatch(setError(shouldBeAtLeast("Password", 5)));
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
      <form onSubmit={handleRegister}>
        <div className="auth__alert-error">Error</div>
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

        <Link className="link" to="/auth/login">
          Already register?
        </Link>
      </form>
    </>
  );
};
