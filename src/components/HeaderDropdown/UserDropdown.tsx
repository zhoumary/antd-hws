import React from "react";
import { Cookies } from "react-cookie";
import Services from '../../services/login';

import { message, Menu, Dropdown } from "antd";

const UserDropdown = () => {
    const currCookie = new Cookies();
    
    const logout = () => {
    
        let bodyFormData = new FormData();
        bodyFormData.append("username", currCookie.get("username"));
        bodyFormData.append("password", currCookie.get("password"));

        Services
            .logout(bodyFormData)
            .then((response) => {
            const respStatus = response.status;
            if (respStatus === 200) {
                message.success("Logout Succeed!");
                
                // go to login page
                const loginPage = "http://localhost:3000/";
                window.location.href = loginPage;
            }
            })
            .catch((error) => {
            message.error("logout " + error);
            })
    }
  
    const onClick = ({ key = "" }) => {
      if (key === "3") {
        return;
      }
  
      message.info(`Click on item ${key}`);
    };
    
    const userMenu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">User Center</Menu.Item>
            <Menu.Item key="2">User Settings</Menu.Item>
            <Menu.Item key="3" onClick={logout}>Log Out</Menu.Item>
        </Menu>
      );

    return (
        <>
            <Dropdown overlay={userMenu}>
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                {/* {currCookie.get("username")} */}
                User Name
              </a>
            </Dropdown>
        </>
    )

}


export default UserDropdown;