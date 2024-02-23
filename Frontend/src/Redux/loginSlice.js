import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./ErrorSlice";

const loginSlice=createSlice({
    name:"login",
    initialState:null,
    reducers:{
        login:(state,action)=>{
           return action.payload
        }
    }
})

const userDataSlice=createSlice({
    name:"LoginUserData",
    initialState:null,
    reducers:{
        fetchLoginUserData:(state,action)=>{
             return action.payload
        }
    }
})



export const LoginSlice=combineReducers({postLoginData:loginSlice.reducer,userLoginData:userDataSlice.reducer})
// export const userLoginData=userDataSlice.reducer
export const {fetchLoginUserData}=userDataSlice.actions
export const {login}=loginSlice.actions

export const signin=()=>async (dispatch,getState)=>{
const state=getState()
   try {
     
    const request = await axios.post("http://localhost:4500/login", {email:state.login.postLoginData['email'],password:state.login.postLoginData['password'],userType:state.login.postLoginData['userType']});
    const response = await request.data;
    const authentication =await response.auth;
    const data =await response.result;
    if (data) {
        dispatch(fetchLoginUserData(data))
        localStorage.setItem("userData", JSON.stringify([data]));
        localStorage.setItem("Token", JSON.stringify(authentication));
      
    } 
  } catch (err) {
    console.log("login error")
    console.log(err)
    if(err.response['data']==="record not found"){
       dispatch(error(err.response['data']))
    }
    if(err.response['data']==="Incorrect password"){
        dispatch(error("user record not found"))
     }
     if(err.response['data']==="Invalid Otp"){
        dispatch(error("user record not found"))
     }


  }
}