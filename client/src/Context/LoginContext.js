import { createContext } from "react";

const LoginContext = createContext({
  loginData: {
    isLoggedIn: true,
    loginState: "signup",
    user: {
      id: 1,
      name: "john",
      email: "test@test.com",
      active: true,
      password: "mypasswordisnotsecured",
    },
  },
  setLoginData: () => {},
});

export const LoginProvider = LoginContext.Provider;

export default LoginContext;
