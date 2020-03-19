import React from "react";
import { Cookies } from "react-cookie";

import { Layout } from "antd";

import "./LoginRegister.css";
import Language from "../assets/地球.svg";
import SAPLogo from "../assets/sap.svg";

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
          <div className="langSetting">
            <img src={Language} className="multiLang" />
          </div>
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
