import "./header.scss";
import React, { useContext, useState, useEffect } from "react";
import LoginContext, { LoginProvider } from "../../Context/LoginContext";

const Header = () => {
  return (
    <header className="header">
      <ul className="header__login-toggle">
        <li className="header__list">
          <LoginContext.Consumer>
            {({ login, setLoginState }) => {
              return (
                <button
                  onClick={(e) =>
                    setLoginState({ ...login, loginState: e.target.name })
                  }
                  name="login"
                  className={`header__button ${
                    login.loginState === "login" && "header__button--active"
                  }`}
                >
                  Login
                </button>
              );
            }}
          </LoginContext.Consumer>
          <LoginContext.Consumer>
            {({ login, setLoginState }) => {
              return (
                <button
                  onClick={(e) =>
                    setLoginState({ ...login, loginState: e.target.name })
                  }
                  name="signup"
                  className={`header__button ${
                    login.loginState === "signup" && "header__button--active"
                  }`}
                >
                  Signup
                </button>
              );
            }}
          </LoginContext.Consumer>
        </li>
      </ul>
    </header>
  );
};

export default Header;
