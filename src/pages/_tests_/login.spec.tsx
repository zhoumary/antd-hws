import React from 'react';
import { Cookies } from "react-cookie";
import { shallow } from 'enzyme';

import {Login} from '../Login';
import { setUserInfo, setUserPermissions } from "../../redux-ts/actions";

it("render login form", () => {
    const wrapper = shallow(<Login loginCookie={new Cookies()} setUserInfo={setUserInfo} setUserPermissions={setUserPermissions} />);
    expect(wrapper.find(".loginContent")).toBeTruthy();
    expect(wrapper.find(".login-form")).toBeTruthy();

    // test login with "frank.zhu01@sap.com" and  "123456"
    const formItems = wrapper.find(".login-form").children();
    const userInput = formItems.at(0).childAt(0);
    const passwordInput = formItems.at(1).childAt(0);

    userInput.simulate('change', {target: {value: 'frank.zhu01@sap.com'}});
    passwordInput.simulate('change', {target: {value: '123456'}});

    
    const loginButton = wrapper.find(".loginRegister").children().at(0);
    console.log(loginButton);
    loginButton.simulate('click');
})