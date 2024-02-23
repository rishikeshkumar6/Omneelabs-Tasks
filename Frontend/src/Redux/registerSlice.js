import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./ErrorSlice";
const registerSlice=createSlice({
    name:"register",
    initialState:null,
    reducers:{
        register:(state,action)=>{
           return action.payload
        }
    }
})

const otpPopup=createSlice({
    name:"otpPopup",
    initialState:false,
    reducers:{
        otpPopups:(state,action)=>{
            return action.payload
         }
    }
})




export const registerSlices= combineReducers({registerData:registerSlice.reducer,otpDisplay:otpPopup.reducer})
// export const otpDisplay=otpPopup.reducer
export const {otpPopups}=otpPopup.actions
export const {register}=registerSlice.actions

export const Signup=()=>async (dispatch,getState)=>{
    // const state=getState()
    // dispatch(otpPopups(true))
    // dispatch(setErrorMessage("Error message"))
    // console.log(state.register)
    try {
        const state=getState()
        const request = await axios.post("http://localhost:4500/register", {
        //   ...Input,
        //   // vendor,
        //   userType:userType,
        //   isOtpVeryfied:false,
        userType:state.register.registerData['userType'],company:state.register.registerData['company'],name:state.register.registerData['name'],
        email:state.register.registerData['email'], mobilenumber: state.register.registerData['mobilenumber'],
        password: state.register.registerData['password'],isOtpVeryfied:false
        
        });
        
        const response = await request.data;
        console.log(response.message);
  
        if (
          typeof response==='object'
        ) {
          // localStorage.setItem("data", JSON.stringify(response));
          localStorage.setItem("data",JSON.stringify(response))
         dispatch(otpPopups(true))
        }
  
        // if (response === "record already found") {
        //   dispatch(setErrorMessage("Email already exists. Please try another email."))
        // }
  
        // setInput({
        //   company: "",
        //   name: "",
        //   email: "",
        //   mobilenumber: "",
        //   password: "",
        // });
      } catch (err) {
        console.log("Error Side");
        console.log(err);
        console.log("Error response")
        console.log(err.response['data'])
       dispatch(error(err.response['data']))
      }
}
