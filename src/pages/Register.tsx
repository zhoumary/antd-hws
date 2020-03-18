import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { Form, Input, Select, Checkbox, Button } from "antd";

import "./Register.css";
import LoginRegister from "../layouts/LoginRegister";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [content, setContent] = useState({
    email: "",
    phone: "",
    wechat: "",
    password: "",
    confirmPassword: ""
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wechat, setWeChat] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [url, setUrl] = useState("http://hn.algolia.com/api/v1/register");
  const [isError, setIsError] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // how to get form content???
  const getForm = () => {
    setContent({
      email: email,
      phone: phone,
      wechat: wechat,
      password: password,
      confirmPassword: confirmPassword
    });
  };

  const onFinish = (event: {}) => {
    toLogin(event);
  };

  const toLogin = (event: {}) => {
    // call API to verify the Username and Password
    getForm();
    callRegister();
  };

  function isEmpty(obj: Object) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const callRegister = () => {
    setIsError(false);
    let registerJudge: boolean = false;

    axios({
      method: "POST",
      baseURL: "",
      url: "/register",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(content)
      // data: qs.stringify(body),
    })
      .then(response => {
        const respData = response.data;
        setData(respData);
        if (isEmpty(respData) && isRegister === true) {
          setIsRegister(false);
          registerJudge = false;
        } else if (!isEmpty(respData) && isRegister === false) {
          setIsRegister(true);
          registerJudge = true;
        }
      })
      .then(() => {
        // link to Welcome page
        if (registerJudge) {
          const login = "http://localhost:3000/";
          window.location.href = login;
        }
      })
      .catch(function(error) {
        console.log(error.toJSON());
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={"86"}
        style={{
          width: 70
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Router>
      <LoginRegister>
        <div className="registerContent">
          <Form
            className="register-form"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{}}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]}
            >
              <Input
                placeholder="E-mail"
                style={{
                  width: "100%"
                }}
                onChange={e => {
                  const email = e.target.value;
                  setEmail(email);
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!"
                }
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%"
                }}
                placeholder="Phone Number"
                onChange={e => {
                  const phone = e.target.value;
                  setPhone(phone);
                }}
              />
            </Form.Item>

            <Form.Item
              name="wechat"
              rules={[
                {
                  required: true,
                  message: "Please input your wechat number!"
                }
              ]}
            >
              <Input
                placeholder="WeChat"
                style={{
                  width: "100%"
                }}
                onChange={e => {
                  const weChat = e.target.value;
                  setWeChat(weChat);
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                onChange={e => {
                  const password = e.target.value;
                  setPassword(password);
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                onChange={e => {
                  const confirmPassword = e.target.value;
                  setConfirmPassword(confirmPassword);
                }}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please read the agreement!"
                }
              ]}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            {isError ? (
              <Form.Item name="error">
                <span>something wrong ......</span>
              </Form.Item>
            ) : (
              <div></div>
            )}
            <Form.Item className="registerOrNot">
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                onClick={toLogin}
              >
                Register
              </Button>
              <a href="/">Sign in with an existing account</a>
            </Form.Item>
          </Form>
        </div>
      </LoginRegister>
    </Router>
  );
};

export default Register;
