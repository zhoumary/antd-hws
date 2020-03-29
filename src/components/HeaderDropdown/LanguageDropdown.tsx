import React from "react";

import { Menu, Dropdown } from "antd";
import { useTranslation } from 'react-i18next';
import "./LanguageDropdown.css";

import Language from "../../assets/地球.svg";

const LanguageDropdown = () => {
    const { i18n } = useTranslation(); 
  
    const onClick = ({ key = "" }) => {
        i18n.changeLanguage(key);
    };
    
    const userLanguage = (
        <Menu onClick={onClick}>
          <Menu.Item key="en">English</Menu.Item>
          <Menu.Item key="zh">Chinese</Menu.Item>
        </Menu>
      );

    return (
        <>
            <Dropdown overlay={userLanguage} className="langSetting">
                <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
                >
                <img src={Language} className="multiLang" alt="multiple languages change" />
                </a>
            </Dropdown>
        </>
    )

}


export default LanguageDropdown;