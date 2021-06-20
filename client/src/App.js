import "./global.scss";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import { useContext, useState } from "react";
import LoginContext, { LoginProvider } from "./Context/LoginContext";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./Pages/Calendar/Calendar";
import CalendarList from "./Pages/CalendarList/CalendarList";
import SocketContext, { socket } from "./Context/socketContext";

function App() {
  const { loginData } = useContext(LoginContext);
  const [login, setLoginState] = useState(loginData);

  return (
    <div>
      {login.isLoggedIn === false && <Redirect from="/" to="/login" />}
      <SocketContext.Provider value={socket}>
        <LoginProvider value={{ login, setLoginState }}>
          <Route path="/" component={Header} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/" component={CalendarList} />
          </Switch>
        </LoginProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
