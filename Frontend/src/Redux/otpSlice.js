import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./ErrorSlice";
const otpSlice=createSlice({
    name:"otpSlice",
    initialState:null,
    reducers:{
        OTP:(state,action)=>{
        return action.payload
        }
    }
})

const otpDataSlice=createSlice({
    name:"otpDataSlice",
    initialState:"",
    reducers:{
        otpData:(state,action)=>{
             return action.payload
        }
    }
})

const sucessOtpMessageSlice=createSlice({
    name:"success Otp message",
    initialState:"",
    reducers:{
        successOtp:(state,action)=>{
        return action.payload
        }
    }
})

export const OTPSLICE=combineReducers({otp:otpSlice.reducer,otpInputData:otpDataSlice.reducer,sucessOtpMessage:sucessOtpMessageSlice.reducer})
// export const otpDatas=otpDataSlice.reducer
// export const successOtpMessage=sucessOtpMessageSlice.reducer
export const {OTP}=otpSlice.actions
export const {successOtp}=sucessOtpMessageSlice.actions
export const {otpData}=otpDataSlice.actions

export const otpFunction=()=>async (dispatch,getState)=>{
       
        try {
            const state=getState()
            const request = await axios.post("http://localhost:4500/otpverification", { otp:state.otp.otpInputData, email:state.register.registerData['email'],userType:state.register.registerData['userType']});
            const response=request.data
              if (response==='otp is verified successfully') {
                dispatch(successOtp("otp is verified successfully"))
              }
          } catch (err) {
            console.log(err);
            dispatch(error(err.response['data']))
          }

}