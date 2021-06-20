import "./header.scss";
import React, { useContext, useState, useEffect } from "react";
import LoginContext, { LoginProvider } from "../../Context/LoginContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
  return (
    <LoginContext.Consumer>
      {({ login, setLoginState }) => {
        if (!login.isLoggedIn) {
          return (
            <>
              <header className="header">
                <ul className="header__login-toggle">
                  <li className="header__list">
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
                    <button
                      onClick={(e) =>
                        setLoginState({ ...login, loginState: e.target.name })
                      }
                      name="signup"
                      className={`header__button ${
                        login.loginState === "signup" &&
                        "header__button--active"
                      }`}
                    >
                      Signup
                    </button>
                  </li>
                </ul>
              </header>
            </>
          );
        } else {
          return (
            <header className="header">
              <BurgerMenu burgerBarClassName={"header__burger-bar"} />
            </header>
          );
        }
      }}
    </LoginContext.Consumer>
  );
};

export default Header;
