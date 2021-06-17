import "./login.scss";
import React from "react";
import LoginContext from "../../Context/LoginContext";

const Login = () => {
  return (
    <div className="login">
      <form className="login__form">
        {
          <LoginContext.Consumer>
            {({ login }) => {
              return (
                login.loginState === "signup" && (
                  <>
                    <label>Name</label>

                    <input
                      className="login__input"
                      type="text"
                      placeholder="Name..."
                      name="name"
                    />
                  </>
                )
              );
            }}
          </LoginContext.Consumer>
        }

        <label>Email</label>
        <input
          className="login__input"
          type="email"
          placeholder="Email..."
          name="email"
        />

        <label>Password</label>
        <input
          className="login__input"
          type="password"
          placeholder="Password..."
          name="email"
        />

        <div className="login__button-container">
          <button className="login__button">Login With Email</button>
          <button className="login__button">Login With Google</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
