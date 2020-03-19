import React, { useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import "./Welcome.css";
import MenuLayout from "../layouts/MenuLayout";
import SAPLogo from "../assets/sap.svg";

const Welcome = () => {
  useEffect(() => {
    getCookie();
  }, []);

  const getCookie = () => {};

  return (
    <Router>
      <MenuLayout>
        <div className="welcome">
          <img src={SAPLogo} className="welcomeLogo" />
          <span className="systemTitle">Welcome S+ POC</span>
        </div>
      </MenuLayout>
    </Router>
  );
};

export default Welcome;
