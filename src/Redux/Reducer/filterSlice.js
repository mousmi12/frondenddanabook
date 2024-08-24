import { createSlice } from "@reduxjs/toolkit";

const initialvalues = {
    filtername : '',
    filterId : ''
}

const FilterSlice = createSlice({
  name:"Filternames",
  initialState :initialvalues,
  reducers: {
    selectFliterFunction: (state,action) => {
      state.filtername = action.payload.filtername;
      state.filterId = action.payload.filterId;
    }
  }
});

export const { selectFliterFunction } = FilterSlice.actions;
export default FilterSlice.reducer;
