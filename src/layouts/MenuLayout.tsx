import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Cookies } from "react-cookie";

import { Layout, message, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import LanguageDropdown from '../components/HeaderDropdown/LanguageDropdown';
import UserDropdown from '../components/HeaderDropdown/UserDropdown';

import "./MenuLayout.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const MenuLayout: React.FC<Props> = props => {
  const [menus, setMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const browserHeight:number = window.innerHeight;

  useEffect(() => {
    renderMenu();
  }); 

  useEffect(() => {
    renderWindowHeight();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserHeight, menuHeight]);

  const renderWindowHeight = () => {
    const menHeight:number = browserHeight - 112;
    setMenuHeight(menHeight);
  }
  

  const renderMenuItems = (menusItems: any) => { 
    return  (<SubMenu
      key={menusItems.code}
      title={
        <span>
          <UserOutlined />
          <span>{menusItems.name}</span>
        </span>
      }
    >
      {renderSubMenus(menusItems.subMenus)}
    </SubMenu>)
  }

  const renderSubMenus = (subMenus: any) => {
    if (subMenus.length === 1) {
      // judge its subMenus count
      let menuItems:any = [];
      if (subMenus[0].subMenus.length === 0) {
        menuItems.push(<Menu.Item key={subMenus[0].code}>{subMenus[0].name}</Menu.Item>)
      } else if (subMenus[0].subMenus.length >= 1) {  
        menuItems.push(renderMenuItems(subMenus[0]))
      }
      if (menuItems) {
        return menuItems 
      }          
    } else if (subMenus.length > 1) {
      let menuItems:any = [];
      subMenus.forEach((subMenu:any) => {
        // judge its subMenus count
        if (subMenu.subMenus.length === 0) {
          menuItems.push(<Menu.Item key={subMenu.code}>{subMenu.name}</Menu.Item>)
        } else if (subMenu.subMenus.length >= 1) {
          menuItems.push(renderMenuItems(subMenu))
        } 
      })
      if (menuItems) {
        return menuItems 
      }          
    } else if (subMenus.length === 0) {
      return 
    }
  }

  const renderMenu = () => {
    
    // const userIDCookie = new Cookies();
    // const cookieID = userIDCookie.get("userID");
    // const queryMenuParam = "/user(" + cookieID + ")/menu";          

    axios({
      method: "GET",
      baseURL: "http://localhost:9000/api",
      url: "/menus",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      responseType: "json"
    })
      .then(response => {
        const respData = response.data;    
        if (respData) {
          setMenus(respData);
        }
      })
      .catch(function(error) {
        const errorResp = error.response;
        
        let errorMsg:string;
        if (errorResp) {
          const errorRespData = errorResp.data;
          if (errorRespData) {
            if (errorRespData.message) {
              errorMsg = errorRespData.message
              message.error("menu" + errorMsg);
            } else {
              message.error("menu" + errorRespData);
            }
          }          
        } else {
          message.error(error.message);
        }
      });
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4" className="commonTool">
            <LanguageDropdown />
          </Menu.Item>
          <Menu.Item key="5" className="commonTool">
            <UserDropdown />
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, minHeight:menuHeight }}
          >
            {menus.map(renderMenuItems)}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 600
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
