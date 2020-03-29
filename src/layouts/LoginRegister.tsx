import React from "react";
import { Cookies } from "react-cookie";

import { Layout } from "antd";
import LanguageDropdown from '../components/HeaderDropdown/LanguageDropdown';

import "./LoginRegister.css";
// import SAPLogo from "../assets/sap.svg";
import Logo from '../assets/pandalogo.jpg';

const { Header, Footer, Content } = Layout;

type Props = {
  children: React.ReactNode;
  cookie: Cookies;
};

const LoginRegister: React.FC<Props> = props => {  
  return (
    <div className="root">
      <Layout className="login">
        <Header className="language">
          <LanguageDropdown />
        </Header>
        <Content className="content">
          <div className="loginTitle">
            <img src={Logo} className="logo" alt="logo" />
            <span className="systemTitle">S+ POC</span>
          </div>
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <span>Copyright 2020 示愛普（中國）有限公司</span>
        </Footer>
      </Layout>
    </div>
  );
};

export default LoginRegister;
