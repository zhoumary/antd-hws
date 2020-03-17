import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const LoginStandard = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Welcome = lazy(() => import("./pages/Welcome"));

const MenuLayout = lazy(() => import("./layouts/MenuLayout"));
const LoginRegister = lazy(() => import("./layouts/LoginRegister"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={LoginStandard} />
          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/welcome" component={Welcome} />

          <Route exact path="/user" component={MenuLayout} />
          <Route exact path="/loginRegister" component={LoginRegister} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
