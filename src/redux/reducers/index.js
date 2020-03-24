import { combineReducers } from "redux";
import todos from "./todos";
import loginRegister from './loginRegister';

export default combineReducers({ todos, loginRegister });