import "./global.scss";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import { useContext, useState, useEffect } from "react";
import LoginContext, { LoginProvider } from "./Context/LoginContext";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./Pages/Calendar/Calendar";
import CalendarList from "./Pages/CalendarList/CalendarList";
import SocketContext, { socket } from "./Context/socketContext";
import axios from "axios";

const url = "http://localhost:5001";

const getToken = localStorage.getItem("jwtUserToken");

function App({ history }) {
  const { loginData } = useContext(LoginContext);
  const [login, setLoginState] = useState(loginData);

  useEffect(() => {
    if (getToken !== undefined && getToken !== null) {
      axios
        .get(`${url}/users`, {
          headers: { authorization: `Bearer ${getToken}` },
        })
        .then((res) => {
          const newLogin = {
            ...login,
            isLoggedIn: true,
            user: res.data,
            jwt: getToken,
          };

          setLoginState(newLogin);
        })
        .catch((err) => console.log("authorization failed", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <LoginProvider value={{ login, setLoginState }}>
          {localStorage.jwtUserToken !== undefined &&
            localStorage.jwtUserToken !== null && (
              <Redirect from="/" to="/login" />
            )}
          <Route path="/" component={Header} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <Route
              exact
              path="/"
              render={(renderProps) => (
                <CalendarList {...renderProps} login={login} />
              )}
            />
            <Route
              exact
              path="/calendar"
              render={(renderProps) => (
                <Calendar {...renderProps} login={login} />
              )}
            />
          </Switch>
        </LoginProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
