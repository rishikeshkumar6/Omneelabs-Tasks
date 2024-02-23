import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const updateUserSlice=createSlice({
    name:"updateUser",
    initialState:null,
    reducers:{
        updateUser:(state,action)=>{
           return action.payload
        }
    }
})

const updatePopupSlice=createSlice({
    name:"updatePopupSlice",
    initialState:false,
    reducers:{
        setPopup:(state,action)=>{
           return action.payload
        }
    }
})



export const UpdateUsers=combineReducers({user:updateUserSlice.reducer,popup:updatePopupSlice.reducer})
// export const updatePopup=updatePopupSlice.reducer
export const {setPopup}=updatePopupSlice.actions
export const {updateUser}=updateUserSlice.actions

export const userUpdate=()=>async (dispatch,getState)=>{
  const state=getState()
  console.log("update redux data")
  console.log(state.updateUser)   
  console.log("update redux data")
  try{
    const request=await axios.put(`http://localhost:4500/updateuserdata/${state.updateUser.user['id']}`,{email:state.updateUser.user['email'],mobilenumber:state.updateUser.user['mobilenumber']})
   const response=await request.data
   console.log(response.message)
   if(response.message=="User updated successfully"){
    dispatch(setPopup(true))
   }
}
catch(error){
 console.log(error)
}

}