import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:null,
  opid:null,
  userId:null,
  apiservicename:null,
  deleteId:null,
};

const ActiveMenuSlice = createSlice({
  name: "selectMenu",
  initialState: initialState,
  reducers: {
    selectMenuFunction: (state, action) => {
      // Accessing name and opid from the payload object
      state.name = action.payload.name;
      state.opid = action.payload.opid;
      state.userId = action.payload.userId;
      state.apiservicename = action.payload.apiservicename;
      state.deleteId = action.payload.deleteId;
    }
  }
});

export const { selectMenuFunction } = ActiveMenuSlice.actions;
export default ActiveMenuSlice.reducer;
