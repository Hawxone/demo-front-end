import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import categoriesReducer from "../features/categorySlice";
import blogsReducer from "../features/blogSlice";
import tagsReducer from "../features/TagSlice";
import imagesReducer from "../features/ImageSlice";
import usersReducer from "../features/UserSlice";

const reducer = {
    products:productsReducer,
    categories:categoriesReducer,
    blogs:blogsReducer,
    tags:tagsReducer,
    images:imagesReducer,
    users:usersReducer,
}

const store =  configureStore({
    reducer:reducer,
    devTools:true
})

export default store
