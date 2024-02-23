import { createSlice } from "@reduxjs/toolkit";
const initialState=""
const ErrorSlice=createSlice({
    name:"error",
    initialState,
    reducers:{
        error:(state,action)=>{
            return action.payload
        }
    }
})

export default ErrorSlice.reducer
export const {error}=ErrorSlice.actions