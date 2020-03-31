import React from 'react';
import { Cookies } from "react-cookie";
import { shallow } from 'enzyme';

import {Login} from '../Login';
import { setUserInfo, setUserPermissions } from "../../redux-ts/actions";

it("render login form", () => {
    const wrapper = shallow(<Login loginCookie={new Cookies()} setUserInfo={setUserInfo} setUserPermissions={setUserPermissions} />);
    expect(wrapper.find(".loginContent")).toBeTruthy();

    // test login with "frank.zhu01@sap.com" and  "123456"
    
})