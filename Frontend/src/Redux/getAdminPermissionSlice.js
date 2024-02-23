import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const getAdminPermissionSlice=createSlice({
    name:"getAdminPermission",
    initialState:null,
   reducers:{
    adminPermission:(state,action)=>{
           return action.payload
    }
   }
})


export const GetAdminPermissionSlice=getAdminPermissionSlice.reducer
export const {adminPermission}=getAdminPermissionSlice.actions

export const GetAdminPermission=()=>async (dispatch)=>{
    const data=JSON.parse(localStorage.getItem('response'))
    console.log("redux response")
    console.log(data)
    console.log("redux response")
     const request=await axios.get("http://localhost:4500/getpermission")
     const response=request.data
     console.log("redux getAdminPermission data")
     console.log(response)
    
     console.log("Find")
     const Find=response.find((elem)=>elem.uid===data._id)
     console.log("Find")
    //  setPermission(Find)
    dispatch(adminPermission(Find))
    console.log("redux userData")
     console.log(Find)
     console.log("redux userData")
     console.log(data)
  
}




