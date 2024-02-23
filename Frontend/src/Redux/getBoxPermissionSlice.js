import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = null

const getBoxPermissionSlice = createSlice({
  name: 'getBoxPermission',
  initialState,
  reducers: {
    setBoxPermission: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBoxPermission } = getBoxPermissionSlice.actions;

export const getAdminBox = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4500/getadminsetting");

    const data=response.data
    console.log("getboxpermission redux")
    console.log(data)
    dispatch(setBoxPermission(...data))
  } catch (error) {
    console.log("error")
    console.error("Error fetching box permissions:", error);
  }
};

export default getBoxPermissionSlice.reducer;
