import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import TagService from "../../../services/TagService";

const initialState = []


export const getTags = createAsyncThunk(
    "tag/get",
    async ()=>{
        const res = await TagService.getAll();
        return res.data;
    }
)

const TagSlice = createSlice({
    name:"tags",
    initialState,
    extraReducers:{
        [getTags.fulfilled]:(state,action)=>{
            return [...action.payload]
        }
    }
})

const {reducer} = TagSlice;
export default reducer;
