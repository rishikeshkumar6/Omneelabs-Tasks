import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState=null
const homeSlice=createSlice({
    name:"homeData",
    initialState,
   reducers:{
    home:(state,action)=>{
        return action.payload
      }
   }
})

export default homeSlice.reducer
export const {home}=homeSlice.actions

export const getHome=()=>async (dispatch)=>{
    const token = JSON.parse(localStorage.getItem('Token'));
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      axios.get('http://localhost:4500/home', config)
        .then(response => {
          dispatch(home(response.data))
          console.log("response")
          localStorage.setItem("response",JSON.stringify(response.data))
          console.log(response.data);
        })
        .catch(error => {
          console.log(error)
          console.error('Error making GET request:', error.response ? error.response.data : error.message);
        });
        
    
    
    } else {
      console.error('Token not found in local storage');
    }
}