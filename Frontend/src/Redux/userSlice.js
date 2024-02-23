import { combineReducers } from "@reduxjs/toolkit";
import ErrorSlice from "./ErrorSlice";
import getBoxPermissionSlice from "./getBoxPermissionSlice";
import userDataSlice from "./userDataSlice";
import homeSlice from "./homeSlice";
import { GetAdminPermissionSlice } from "./getAdminPermissionSlice";
import { LoginSlice } from "./loginSlice";
import {  registerSlices } from "./registerSlice";
import { UpdateUsers } from "./userUpdateSlice";
import {  OTPSLICE } from "./otpSlice";
import adminLoginSlice, { adminSlice } from "./adminLoginSlice";


const rootReducer=combineReducers({Error:ErrorSlice,
    getBoxPermission: getBoxPermissionSlice,
    adminPermission:GetAdminPermissionSlice,
    home:homeSlice,
    admin:adminSlice,
    userData:userDataSlice,
    register:registerSlices,
    login:LoginSlice,
    updateUser:UpdateUsers,
    otp:OTPSLICE,})


export const appReducer = (state, action) => {
    if (action.type === 'resetallstate') {
      return rootReducer(undefined, action); 
    }
    return rootReducer(state, action); 
  };

   export const resetAllState=()=>{
    return {
        type:"resetallstate"
    }
}

export default rootReducer




