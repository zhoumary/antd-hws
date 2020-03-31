import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Cookies } from "react-cookie";
import { connect } from "react-redux";
import store from "../redux-ts/store";
import { setUserInfo, setUserPermissions } from "../redux-ts/actions";
import Services from '../services/login';

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

import "./Login.css";
import LoginRegister from "../layouts/LoginRegister";

type Props = {
  loginCookie: Cookies;
  setUserInfo: typeof setUserInfo;
  setUserPermissions: typeof setUserPermissions;
};

export const Login: React.FC<Props> = props => {
  const { t } = useTranslation();  
  const [form] = Form.useForm();

  let userid:number;
  let username:string;
  let userkey:string;
  let permissions:string[];

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [canLogin, setCanLogin] = useState(true);

  const loginCookies = new Cookies();

  useEffect(() => {
    if (userName !== "" && password !== "" && canLogin === true) {
      setCanLogin(false);
    } else if ((userName === "" || password === "") && canLogin === false) {
      setCanLogin(true);
    }
  }, [userName, password, canLogin]);

  const onFinish = (event: {}) => {
    // if the validation succed, invoke login function
    login(event);
  };

  const login = (event: {}) => {
    // call API to verify the Username and Password
    callLogin();
  };

  const callLogin = () => {
    setIsError(false);

    let bodyFormData = new FormData();
    bodyFormData.append("username", userName);
    bodyFormData.append("password", password);
    console.log(bodyFormData);

    // invoke the request from utils
    Services
      .login(bodyFormData)
      .then((response) => {
        console.log(response);
        if (response) {
          const authorities = response.authorities;
          const userId = response.id;
          if (!(userId) && isLogin === true) {
            setIsLogin(false);
          } else if (userId && isLogin === false) {
            setIsLogin(true);
        

            /*
              set cookies and store
            */            
            userid = userId;
            username = userName;
            userkey = password;
            permissions = authorities;
            

            // invoke the Redux action-setUserInfo to set user information
            if (userid && username && userkey) {
              loginCookies.set("username", userName, { path: "/", httpOnly:true });
              loginCookies.set("userID", userId, { path: "/" });
              
              props.setUserInfo({
                userID: userid,
                userName: username,
                password: userkey
              });
              props.setUserPermissions({
                permissions: permissions
              })
              console.log(store.getState());

              userid = 0;
              username = "";
              userkey = "";
              permissions = [];

              setIsLogin(false);

              const welcome = window.location.href + "user/welcome";
              window.location.href = welcome;
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsError(true);
      })

      
  };

  return (
    <Router>
      <LoginRegister cookie={loginCookies}>
        <div className="loginContent">
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t('username.1')}
                value="username"
                onChange={e => {
                  const name = e.target.value;
                  setUserName(name);
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                value="password"
                placeholder={t('password.1')}
                onChange={e => {
                  const password = e.target.value;
                  setPassword(password);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('remember.1')}</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="/">
              {t('forgot.1')}
              </a>
            </Form.Item>

            {isError ? (
              <Form.Item name="error">
                <span style={{ color: "#ff4d4f" }}>{error}</span>
              </Form.Item>
            ) : (
              <div></div>
            )}
            <Form.Item className="loginRegister" shouldUpdate={true}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={login}
                disabled={canLogin}
              >
                {t('login.1')}
              </Button>
              <span>
                {t('or.1')} <a href="/user/register">{t('register.1')}</a>
              </span>
            </Form.Item>
          </Form>
        </div>
      </LoginRegister>
    </Router>
  );
};

export default connect(
  null,
  { setUserInfo, setUserPermissions }
)(Login);

