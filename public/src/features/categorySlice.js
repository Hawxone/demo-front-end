import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import categoryService from "../../../services/CategoryService";

const initialState=[];

export const getCategories = createAsyncThunk(
    "category/get",
    async ()=>{
        const res= await categoryService.getAll()
        return res.data;
    }
)

const categorySlice = createSlice({
    name:"categories",
    initialState,
    extraReducers:{
        [getCategories.fulfilled]:(state,action)=>{
            return [...action.payload]
        }
    }
})


const {reducer} = categorySlice;
export default reducer;
