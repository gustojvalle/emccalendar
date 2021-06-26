import "./login.scss";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import { loginServerRequest, registerUser } from "../../modules/fetchingData";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register");
    registerUser(formData);
  };
  const handleLogin = (e, login, setLoginData) => {
    e.preventDefault();
    loginServerRequest(
      { email: formData.email, password: formData.password },

      login,
      setLoginData,
      history
    );
  };

  return (
    <div className="login">
      {
        <LoginContext.Consumer>
          {(props) => {
            const { login, setLoginState } = props;

            return (
              <>
                <form className="login__form">
                  {login.isLoggedIn && <Redirect from="/login" to="/" />}

                  {login.loginState === "signup" && (
                    <>
                      <label className="login__label">Name</label>

                      <input
                        onChange={handleChange}
                        className="login__input"
                        type="text"
                        placeholder="Name..."
                        name="name"
                        value={formData.name}
                      />
                    </>
                  )}
                  <label className="login__label">Email</label>
                  <input
                    onChange={handleChange}
                    className="login__input"
                    type="email"
                    placeholder="Email..."
                    name="email"
                    value={formData.email}
                  />

                  <label className="login__label">Password</label>
                  <input
                    onChange={handleChange}
                    className="login__input"
                    type="password"
                    placeholder="Password..."
                    name="password"
                    value={formData.password}
                  />

                  <div className="login__button-container">
                    <button
                      onClick={
                        login.loginState === "login"
                          ? (e) => handleLogin(e, login, setLoginState)
                          : handleRegister
                      }
                      className="login__button-left"
                    >
                      {login.loginState === "login" ? "Login" : "Signup"} With
                      Email
                    </button>
                    <button className="login__button">
                      {login.loginState === "login" ? "Login" : "Signup"} With
                      Google
                    </button>
                  </div>
                </form>
              </>
            );
          }}
        </LoginContext.Consumer>
      }
    </div>
  );
};

export default Login;
