import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Cookies } from "react-cookie";
import { connect } from "react-redux";
import store from "../redux/store";
import { setUserID } from "../redux/actions";


import { Form, Input, Select, Checkbox, Button } from "antd";

import "./Register.css";
import LoginRegister from "../layouts/LoginRegister";

const { Option } = Select;
type Props = {
  setUserID: typeof setUserID;
};

const Register: React.FC<Props> = props => {
  const [form] = Form.useForm();
  let userID:Number;

  const [data, setData] = useState({});
  const [content, setContent] = useState({
    email: "",
    mobile: "",
    name: "",
    password: "",
    roles:  [],
    confirmPassword: ""
  });
  let selectedRoles:any = [];
  const [allRoles, setallRoles] = useState([])
  const [isRoleError, setIsRoleError] = useState(false);
  const [roleError, setRoleError] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const registerCookie = new Cookies();

  useEffect(() => {
    getAllRoles()
  }, [])

  function isEmpty(obj: Object) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const getAllRoles = () => {
    setIsRoleError(false);
    
    axios({
      method: "GET",
      url: "http://10.130.228.66:9091/api/v1/roles",
    })
      .then(response => {
        const respData = response.data;
        console.log(respData)
        setData(respData);
        if (!isEmpty(respData)) {
          setallRoles(respData);
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
              setRoleError(errorMsg);
            } else {
              setRoleError(errorRespData);
            }
          }
          
        } else {
          setRoleError(error.message);
        }
        
        setIsRoleError(true);
      });
  }

  const loadRolesDesc = (eachRole:any) => {
    
    return(<Option key={eachRole.id} value={eachRole.id}>{eachRole.description}</Option>)
  }

  const onFinish = (event: {}) => {
    toRegister(event);
  };

  const toRegister = (event: {}) => {
    // call API to verify the Username and Password
    callRegister();
  };  

  const callRegister = () => {
    console.log(content);
    setIsError(false);
    let registerJudge: boolean = false;
    let testContent = qs.stringify(content)
    console.log(testContent);

    axios({
      method: "POST",
      url: "http://10.130.228.66:9091/api/v1/users/register",
      headers: {
        "content-type": "application/json"
      },
      data: content
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
          
          userID = respData.id;

          // save user id to cookie
          const userIDCookie = new Cookies()
          userIDCookie.set("userID", respData.id, { path: "/" })
          userIDCookie.set("username", content.email, { path: "/" })
          userIDCookie.set("password", content.password, { path: "/" })
        }
      })
      .then(() => {
        // link to Welcome page
        if (registerJudge) {
          setIsRegister(false);
          registerJudge = false;

          // invoke the Redux action-setUserID to set user id
          if (userID) {
            props.setUserID(userID);
            console.log(store.getState());
            userID = 0;

            // const login = "http://localhost:3000/";
            // window.location.href = login;
          }
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
              setError(errorMsg);
            } else {
              setError(errorRespData);
            }
          }          
        } else {
          setError(error.message);
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
          // setContent({ ...content, phonePrefix: phonePrefix });
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  

  return (
    <Router>
      <LoginRegister cookie={registerCookie}>
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your wechat number!"
                }
              ]}
            >
              <Input
                placeholder="Name"
                style={{
                  width: "100%"
                }}
                onChange={e => {
                  const name = e.target.value;
                  setContent({ ...content, name: name });
                }}
              />
            </Form.Item>
            
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
                  setContent({ ...content, mobile: phone });
                }}
              />
            </Form.Item>

            
            {isRoleError ? (
              <Form.Item name="error">
                <span style={{ color: "#ff4d4f" }}>{roleError}</span>
              </Form.Item>
            ) : (
              <div></div>
            )}
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select your roles!"
                }
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={e => {
                  selectedRoles = e 
                  
                  setContent({ ...content, roles: selectedRoles });
                }}
              >
                {allRoles.map(loadRolesDesc)}
              </Select>
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

export default connect(
  null,
  { setUserID }
)(Register);
