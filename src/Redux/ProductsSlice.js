import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products :[]
}
export const getAllProducts = createAsyncThunk('products/getAllProducts',async ()=>{
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
})
export const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder)=>{
            builder.addCase(getAllProducts.fulfilled,(state,action)=>{
                state.products = action.payload
                console.log("Done");
            }).addCase(getAllProducts.pending,()=>{
                console.log("pending");
            }).addCase(getAllProducts.rejected,()=>{
                console.log("rejected");
            })
    }}
)
export const productsReducer = productsSlice.reducer 