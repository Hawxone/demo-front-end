import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import categoriesReducer from "../features/categorySlice"

const reducer = {
    products:productsReducer,
    categories:categoriesReducer
}

const store =  configureStore({
    reducer:reducer,
    devTools:true
})

export default store
