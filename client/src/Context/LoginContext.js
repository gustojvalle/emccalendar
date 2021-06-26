import { createContext } from "react";

const LoginContext = createContext({
  loginData: {
    isLoggedIn: false,
    loginState: "login",
    user: {},
    jwt: "",
  },
  setLoginData: () => {},
});

export const LoginProvider = LoginContext.Provider;

export default LoginContext;
