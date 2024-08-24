import { createSlice } from "@reduxjs/toolkit";

const initialvalues = {
    label : null,
}

const menuLabelReportSlice = createSlice({
  name:"reportMenuLAbel",
  initialState :initialvalues,
  reducers: {
    selectLabelFunction: (state,action) => {
      state.label = action.payload.label;
    }
  }
});

export const { selectLabelFunction } = menuLabelReportSlice.actions;
export default menuLabelReportSlice.reducer;
