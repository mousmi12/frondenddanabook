import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chequedata:{
        amount: "",
        bank: "",
        date: "",
        partname: "",
      },

    
}

const chequeSlice = createSlice({
    name:"getchequedata",
    initialState:initialState,
    reducers:{
        setChequedataFunction:(state,action)=> {
            state.chequedata = action.payload
        }
    }
})

export const {setChequedataFunction} = chequeSlice.actions 
export default chequeSlice.reducer
