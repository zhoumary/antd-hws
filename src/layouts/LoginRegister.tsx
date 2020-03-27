import React from "react";
import { Cookies } from "react-cookie";

import { Layout, Menu, Dropdown } from "antd";
import { useTranslation } from 'react-i18next';

import "./LoginRegister.css";
import Language from "../assets/地球.svg";
import SAPLogo from "../assets/sap.svg";

const { Header, Footer, Content } = Layout;

type Props = {
  children: React.ReactNode;
  cookie: Cookies;
};

const LoginRegister: React.FC<Props> = props => {
  const { t, i18n } = useTranslation(); 
  
  const onClick = ({ key = "" }) => {
    i18n.changeLanguage(key);
  };
  
  const userLanguage = (
    <Menu onClick={onClick} style={{minWidth:"69px", left:"1321px"}}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="zh">Chinese</Menu.Item>
    </Menu>
  );
  
  
  return (
    <div className="root">
      <Layout className="login">
        <Header className="language">
          {/* <div className="langSetting">
            <img src={Language} className="multiLang" />
          </div> */}
          <Dropdown overlay={userLanguage} className="langSetting">
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                <img src={Language} className="multiLang" />
              </a>
          </Dropdown>
        </Header>
        <Content className="content">
          <div className="loginTitle">
            <img src={SAPLogo} className="logo" />
            <span className="systemTitle">S+ POC</span>
          </div>
          {props.children}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          <span>Copyright 2020 思愛普（中國）有限公司</span>
        </Footer>
      </Layout>
    </div>
  );
};

export default LoginRegister;
