import React, { useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.css";
import LoginRegister from "../layouts/LoginRegister";

const menu = {};
const menuContext = React.createContext(menu);

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = (event: {}) => {
    // if the validation succed, invoke login function
    login(event);
  };

  const nameChange = (e: React.FormEvent<HTMLInputElement>) => {
    // get user name
    const newValue = e.currentTarget.value;
    setUserName(newValue);
  };

  const passwordChange = (e: React.FormEvent<HTMLInputElement>) => {
    // get password
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  };

  const login = (event: {}) => {
    // call API to verify the Username and Password
    callLogin();

    // link to Welcome page
    if (isLogin) {
      const welcome = window.location.href + "user/welcome";
      window.location.href = welcome;
    }
  };

  const callLogin = () => {
    const name = userName;
    const key = password;
    const body = {
      name: name,
      key: key
    };

    // post name and key to API
    fetch(`http://localhost:4000/weather`, {
      method: "POST",
      body: JSON.stringify(body), // string or object
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        // process the response
        response = menu;

        setIsLogin(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <Router>
      <LoginRegister>
        <div className="loginContent">
          <Form
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
                placeholder="Username"
                onChange={nameChange}
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
                placeholder="Password"
                onChange={passwordChange}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className="loginRegister">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={onFinish}
              >
                Log in
              </Button>
              <span>
                Or <a href="/user/register">register now!</a>
              </span>
            </Form.Item>
          </Form>
        </div>
      </LoginRegister>
    </Router>
  );
};

export default Login;
