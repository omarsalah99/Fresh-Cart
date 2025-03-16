import { createSlice } from "@reduxjs/toolkit";


let initialState={
    counter: 0,
    userName:"omar"
    }

let counterSlice = createSlice({
    name: 'counter',
    initialState,
        reducers: {
            increase:(state)=> {state.counter++},
            decrease:(state)=> {state.counter--},
            mero:(state,actiion)=> {state.counter+=actiion.payload},
        }
})
export const counterReducer = counterSlice.reducer;
export const {increase,decrease,mero} = counterSlice.actions