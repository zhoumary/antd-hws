import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Cookies} from "react-cookie";
import axios from "axios";
import {getUser} from '../services/getUser';

import {Card} from 'antd';

import "./Welcome.css";
import MenuLayout from "../layouts/MenuLayout";
import SAPLogo from "../assets/sap.svg";

const Welcome = () => {
  const [userCardInfo, setUserCardInfo] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    getUserInfo();
  }, []);



  const getUserInfo = () => {
    const currCookie = new Cookies()
    const userID = currCookie.get("userID")
    const userName = currCookie.get("username")
    const password = currCookie.get("password")
    if (userID) {
      const userURL = "http://10.130.228.66:9091/api/v1/users/" + userID.toString()
      setIsError(false);

      getUser(userName, password, userID)
        .then((response) => {
          if (response) {
            setUserCardInfo(response);
          }
        })
        .catch((error) => {
          setError(error);
          setIsError(true);
        })

      // axios({
      //   method: "GET",
      //   auth: {
      //     username: userName,
      //     password: password
      //   },
      //   url: userURL,
      // })
      //   .then(response => {
      //     const respData = response.data;
      //     console.log(respData)
          
      //     if (respData) {
      //       setUserCardInfo(respData);
      //     }
      //   })
      //   .catch(function(error) {
      //     const errorResp = error.response;
          
      //     let errorMsg:string;
      //     if (errorResp) {
      //       const errorRespData = errorResp.data;
      //       if (errorRespData) {
      //         if (errorRespData.message) {
      //           errorMsg = errorRespData.message
      //           setError(errorMsg);
      //         } else {
      //           setError(errorRespData);
      //         }
      //       }            
      //     } else {
      //       setError(error.message);
      //     }
          
      //     setIsError(true);
      //   });
    } else {
      setIsError(true);
      setError("The user information is incomplete.")
    }
  };

  const renderInfo = (infor:any) => {
    if (infor) {      
      return (
        <Card
            style={{ marginTop: 16 }}
            type="inner"
            title={infor}
            key={infor}
          >
            {userCardInfo[infor]}
        </Card>
      )     
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
            {isError ? (
              <span style={{ color: "#ff4d4f" }}>{error}</span>
            ) : (
              Object.keys(userCardInfo).map(renderInfo)
            )}
            
          </div>
        </div>

      </MenuLayout>
    </Router>
  );
};

export default Welcome;
