import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
  name:"alertBox",
  initialState: {
    display: false
  },
  reducers: {
    selectAlertFunction: (state,action) => {
      state.display = action.payload
    }
  }
});

export const { selectAlertFunction } = AlertSlice.actions;
export default AlertSlice.reducer;
