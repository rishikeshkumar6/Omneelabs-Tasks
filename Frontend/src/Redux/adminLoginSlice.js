import {combineReducers, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { error } from "./ErrorSlice"
const adminLoginSlice=createSlice({
    name:"adminLogin",
    initialState:null,
    reducers:{
        adminLogin:(state,action)=>{
           return action.payload
        }
    }
})

const fetchAdminDataSlice=createSlice({
    name:"fetchAdminData",
    initialState:null,
    reducers:{
        fetchAdminData:(state,action)=>{
           return action.payload
        }
    }
})

export const adminSlice=combineReducers({postAdminData:adminLoginSlice.reducer,fetchAdminData:fetchAdminDataSlice.reducer})
export const {adminLogin}=adminLoginSlice.actions
export const {fetchAdminData}=fetchAdminDataSlice.actions

export const loginAdmin=()=>async (dispatch,getState)=>{
      
       try{
        const state=getState()
        const request=await axios.post("http://localhost:4500/adminlogin",{email:state.admin.postAdminData['email'],password:state.admin.postAdminData['password']})
        const response=request.data
        const authentication =await response.auth;
        const data =await response.result;
        dispatch(fetchAdminData(data))
        console.log(authentication)
        console.log(data)
        // if(data.userType==="Admin"){
        //       navigate('/admin')
        // }
        
        if (data) {
           localStorage.setItem("userData", JSON.stringify([data]));
           localStorage.setItem("Token", JSON.stringify(authentication));
           } 
    }
    catch(err){
        console.log(err)
        if(err.response['data']==="Wrong email or password"){
           dispatch(error("admin record not found"))
        }
    }
}

