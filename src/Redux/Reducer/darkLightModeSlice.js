
import { createSlice } from "@reduxjs/toolkit";

const darkLightModeSlice = createSlice({
  name:"darkMode",
  initialState: {
    checkvalue: true
  },
  reducers: {
    selectDarkModeFunction: (state,action) => {
      state.checkvalue = action.payload.checkvalue
    }
  }
});

export const { selectDarkModeFunction } = darkLightModeSlice.actions;
export default darkLightModeSlice.reducer;
