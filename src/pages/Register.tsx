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
    phonePrefix: "86",
    phoneNumber: "",
    wechat: "",
    password: "",
    confirmPassword: ""
  });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const onFinish = (event: {}) => {
    toRegister(event);
  };

  const toRegister = (event: {}) => {
    // call API to verify the Username and Password
    callRegister();
  };

  function isEmpty(obj: Object) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const callRegister = () => {
    console.log(content);
    setIsError(false);
    let registerJudge: boolean = false;

    axios({
      method: "POST",
      baseURL: "",
      url: "/register",
      headers: {
        "content-type": "application/json"
      },
      data: qs.stringify(content)
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
        const errorMsg = error.message;
        if (errorMsg) {
          setError(errorMsg);
        }
        setIsError(true);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={"86"}
        style={{
          width: 70
        }}
        onChange={e => {
          const phonePrefix = e;
          setContent({ ...content, phonePrefix: phonePrefix });
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
                  setContent({ ...content, email: email });
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
                  setContent({ ...content, phoneNumber: phone });
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
                  setContent({ ...content, wechat: weChat });
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
                  setContent({ ...content, password: password });
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
                  setContent({ ...content, confirmPassword: confirmPassword });
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
                <span style={{ color: "#ff4d4f" }}>{error}</span>
              </Form.Item>
            ) : (
              <div></div>
            )}
            <Form.Item className="registerOrNot">
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                onClick={toRegister}
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
