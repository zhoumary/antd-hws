import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
// import Cookies from "universal-cookie";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.css";
import LoginRegister from "../layouts/LoginRegister";

// const cookies = new Cookies();

type Props = {
  loginData: {};
};

const Login: React.FC<Props> = props => {
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [canLogin, setCanLogin] = useState(true);

  useEffect(() => {
    if (userName !== "" && password !== "" && canLogin === true) {
      setCanLogin(false);
    } else if ((userName === "" || password === "") && canLogin === false) {
      setCanLogin(true);
    }
  }, [userName, password]);

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

  function isEmpty(obj: Object) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const login = (event: {}) => {
    // call API to verify the Username and Password
    callLogin();
  };

  const callLogin = () => {
    setIsError(false);
    let loginJudge: boolean = false;

    let bodyFormData = new FormData();
    bodyFormData.set("username", userName);
    bodyFormData.set("password", password);

    axios({
      method: "POST",
      baseURL: "",
      url: "/login",
      headers: {
        "content-type": "multipart/form-data"
      },
      data: bodyFormData
    })
      .then(response => {
        const respData = response.data;
        setData(respData);
        if (isEmpty(respData) && isLogin === true) {
          setIsLogin(false);
          loginJudge = false;
        } else if (!isEmpty(respData) && isLogin === false) {
          setIsLogin(true);
          loginJudge = true;

          // set cookies
          const respID = respData;
          // const cookies = new Cookies();
          // cookies.set("sessionID", respID, { path: "/" });
          // console.log(cookies.get("sessionID"));
        }
      })
      .then(() => {
        // link to Welcome page
        if (loginJudge) {
          const welcome = window.location.href + "user/welcome";
          window.location.href = welcome;
        }
      })
      .catch(function(error) {
        const errorMsg = error.message;
        if (errorMsg) {
          setError(errorMsg);
        }
        setIsError(true);
      });
  };

  return (
    <Router>
      <LoginRegister>
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
                placeholder="Username"
                value="username"
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
                value="password"
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
