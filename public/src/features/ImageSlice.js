import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ImageService from "../../../services/ImageService";




const initialState = [];

export const getImages = createAsyncThunk(
    "image/get",
    async ()=>{
        const res = await ImageService.getAll();
        return res.data;
    }
)

export const saveImage = createAsyncThunk(
    "product/post",
    async (title)=>{
        console.log(title)
        const res = await ImageService.saveImage({title});
        return res.data;
    }
)

const ImageSlice = createSlice({
    name:"images",
    initialState,
    extraReducers:{
        [getImages.fulfilled]:(state,action)=>{
            return [...action.payload]
        },
    }
})

const {reducer} = ImageSlice;
export default reducer;
