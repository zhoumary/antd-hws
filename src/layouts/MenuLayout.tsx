import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import Services from '../services/login';

import { Layout, message, Menu, Breadcrumb, Dropdown } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";

import "./MenuLayout.css";
import Language from "../assets/地球.svg";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const MenuLayout: React.FC<Props> = props => {
  // const [menus, setMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const currCookie = new Cookies();

  const onClick = ({ key = "" }) => {
    if (key === "3") {
      return;
    }

    message.info(`Click on item ${key}`);
  };

  useEffect(() => {
    // renderMenu();
  }, []); 
  

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
      subMenus.map((subMenu:any) => {
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

  // mock menus to render home menu
  const mockMenus = [{
    id: 1,      
    code: "01",      
    sequence: 1,      
    name: "menu_01",      
    subMenus: [{      
            id: 1,      
            code: "0101",      
            sequence: 1,      
            name: "menu_0101",      
            subMenus: [{      
              id: 1,      
              code: "010101",      
              sequence: 1,      
              name: "menu_010101",      
              subMenus: []     
          }, {      
            id: 2,      
            code: "010102",      
            sequence: 2,      
            name: "menu_010102",      
            subMenus: []      
        }]     
        }, 
        {     
            id: 2,      
            code: "0102",      
            sequence: 2,      
            name: "menu_0102",      
            subMenus: [{      
              id: 1,      
              code: "010201",      
              sequence: 1,      
              name: "menu_010201",      
              subMenus: [{      
                id: 1,      
                code: "01020101",      
                sequence: 1,      
                name: "menu_01020101",      
                subMenus: []      
            }]      
          }]      
        }      
    ]      
  },{
    id: 2,      
    code: "02",      
    sequence: 2,      
    name: "menu_02",      
    subMenus: [{      
            id: 1,      
            code: "0201",      
            sequence: 1,      
            name: "menu_0201",      
            subMenus: [{      
              id: 1,      
              code: "020101",      
              sequence: 1,      
              name: "menu_020101",      
              subMenus: []     
          }, {      
            id: 2,      
            code: "010202",      
            sequence: 2,      
            name: "menu_010202",      
            subMenus: []      
        }]     
        }, 
        {     
            id: 2,      
            code: "0202",      
            sequence: 2,      
            name: "menu_0202",      
            subMenus: [{      
              id: 1,      
              code: "020201",      
              sequence: 1,      
              name: "menu_020201",      
              subMenus: [{      
                id: 1,      
                code: "02020101",      
                sequence: 1,      
                name: "menu_01020101",      
                subMenus: []      
            }]      
          }]      
        }      
    ]      
  }]

  const renderMenu = () => {
    
    const userIDCookie = new Cookies();
    const cookieID = userIDCookie.get("userID");
    const queryMenuParam = "/user(" + cookieID + ")/menu";          

    axios({
      method: "GET",
      baseURL: "",
      url: queryMenuParam,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      responseType: "json"
    })
      .then(response => {
        const respData = response.data;    
        if (respData) {
          // setMenus(respData);
        }
      })
      .then(() => {
        // renderMenuItems(menus);
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

  const userMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">User Center</Menu.Item>
      <Menu.Item key="2">User Settings</Menu.Item>
      <Menu.Item key="3" onClick={logout}>Log Out</Menu.Item>
    </Menu>
  );

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
            <img src={Language} className="multiLang" />
          </Menu.Item>
          <Menu.Item key="5" className="commonTool">
            <Dropdown overlay={userMenu}>
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                {currCookie.get("username")}
              </a>
            </Dropdown>
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
            style={{ height: "100%", borderRight: 0 }}
          >
            {mockMenus.map(renderMenuItems)}
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
