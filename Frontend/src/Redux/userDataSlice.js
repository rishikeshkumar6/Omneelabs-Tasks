import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        fetchData: (state, action) => {
            return action.payload;
        }
    }
});

export default userDataSlice.reducer;
export const { fetchData } = userDataSlice.actions;


export const getUserData = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:4500/userdata");
        console.log("redux userData");
        console.log(response.data); 
        dispatch(fetchData(response.data)); 
    } catch (error) {
        console.log(error);
    }
};
