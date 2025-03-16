import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { productsReducer } from "./ProductsSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer 
    }
})