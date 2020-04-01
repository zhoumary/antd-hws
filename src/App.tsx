import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Cookies, withCookies } from "react-cookie";

import "./App.css";

const LoginStandard = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Welcome = lazy(() => import("./pages/Welcome"));

const MenuLayout = lazy(() => import("./layouts/MenuLayout"));
const LoginRegister = lazy(() => import("./layouts/LoginRegister"));

let testCookie = new Cookies();

const App = () => {
  return (
    <Router>      
      <Switch>
        <Route
          exact
          path="/"
          component={LoginStandard} />}
        />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/welcome" component={Welcome} />

        <Route exact path="/user" component={MenuLayout} />
        <Route
          exact
          path="/loginRegister"
          render={() => (
            <LoginRegister cookie={testCookie} children={<div></div>} />
          )}
        />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default withCookies(App);
