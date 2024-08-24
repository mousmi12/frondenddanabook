import { createSlice } from "@reduxjs/toolkit";
const initialvalues = {
    submenulabel:null 
}

const getSubmenuLabel = createSlice({
    name:"getsubmenulabel",
    initialState:initialvalues,
    reducers:{
        selectSubmenuLabelFunction:(state,action)=> {
            state.submenulabel = action.payload.submenulabel
        }
    }

})

export const {selectSubmenuLabelFunction} = getSubmenuLabel.actions 
export default getSubmenuLabel.reducer