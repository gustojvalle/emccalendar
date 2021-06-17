import "./global.scss";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import { useContext, useState } from "react";
import LoginContext, { LoginProvider } from "./Context/LoginContext";
import { Route, Redirect } from "react-router-dom";
import Calendar from "./Pages/Calendar/Calendar";
import CalendarList from "./Pages/CalendarList/CalendarList";
function App() {
  const { loginData } = useContext(LoginContext);
  const [login, setLoginState] = useState(loginData);

  return (
    <div>
      {login.isLoggedIn === false && <Redirect from="/" to="/login" />}
      <LoginProvider value={{ login, setLoginState }}>
        <Header />
        <Route path="/" component={CalendarList} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/login">
          <Login />
        </Route>
      </LoginProvider>
    </div>
  );
}

export default App;
