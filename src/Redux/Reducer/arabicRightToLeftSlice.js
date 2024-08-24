import { createSlice } from "@reduxjs/toolkit";
const ArabicSlice = createSlice({
  name:"arabicAlignMent",
  initialState: {
    rightToLeft:'ltr'
  },
  reducers: {
    selectArabicAlignmentFunction: (state,action) => {
      state.rightToLeft = action.payload.rightToLeft
    }
  }
});

export const { selectArabicAlignmentFunction } = ArabicSlice.actions;
export default ArabicSlice.reducer;
