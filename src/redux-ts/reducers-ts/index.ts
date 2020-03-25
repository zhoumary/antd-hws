import { combineReducers } from "redux";
import loginRegister from './loginRegister';
import permissions from './permissions';

export default combineReducers({ loginRegister, permissions });