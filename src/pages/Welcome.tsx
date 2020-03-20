import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Cookies} from "react-cookie";
import axios from "axios";

import {Card} from 'antd';

import "./Welcome.css";
import MenuLayout from "../layouts/MenuLayout";
import SAPLogo from "../assets/sap.svg";

const Welcome = () => {
  const [userInfo, setUserInfo] = useState({})
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    getUserInfo();
  }, []);



  const getUserInfo = () => {
    const currCookie = new Cookies()
    const userID = currCookie.get("userID")
    if (userID) {
      const userURL = "http://10.130.228.66:9091/users" + userID.toString()
      setIsError(false);

      axios({
        method: "GET",
        url: userURL,
      })
        .then(response => {
          const respData = response.data;
          console.log(respData)
          
          if (respData) {
            setUserInfo(respData);
          }
        })
        .catch(function(error) {
          const errorMsg = error.message;
          if (errorMsg) {
            setError(errorMsg);
          }
          setIsError(true);
        });
    }
  };

  const renderUserInfo = () => {
    if (userInfo) {
      // Object.keys(userInfo).map(function(key, index) {
      //   return (
      //     <Card
      //         style={{ marginTop: 16 }}
      //         type="inner"
      //         title="Inner Card title"
      //       >
      //         userInfo[key]
      //     </Card>
      //   )
      // });
    }
  }

  return (
    <Router>
      <MenuLayout>
        <div>
          <div className="welcome">
            <img src={SAPLogo} className="welcomeLogo" />
            <span className="systemTitle">Welcome S+ POC</span>          
          </div>
          <div className="userInfo">
          <Card title="User Info" style={{ width: 300 }}>
            <p className="site-card-demo-inner-p">User</p>
            {isError ? (
              <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Inner Card title"
            >
              {error}
            </Card>
            ) : (
              <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="User"
            >
              User Information
            </Card>
            )}
          </Card>
          </div>
        </div>

      </MenuLayout>
    </Router>
  );
};

export default Welcome;
