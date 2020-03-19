import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { instanceOf } from "prop-types";
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
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <LoginStandard loginCookie={testCookie} />}
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
        </Switch>
      </Suspense>
    </Router>
  );
};

export default withCookies(App);
