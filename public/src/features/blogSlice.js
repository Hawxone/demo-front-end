import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import BlogService from "../../../services/BlogService";
import blogService from "../../../services/BlogService";



const initialState = [];

export const getBlogs = createAsyncThunk(
    "blog/get",
    async ()=>{
        const res = await BlogService.getAll();
        return res.data;
    }
)

export const saveBlog = createAsyncThunk(
    "blog/post",
    async ({formData,blogState})=>{
        const res = await blogService.saveBlog(formData)
        return blogState;
    }
)

export const updateBlog = createAsyncThunk(
    "blog/update",
    async ({id,formData,currentBlog})=>{
        const res = await blogService.update(id,formData);
        return currentBlog;
    }
)

export const deleteBlog = createAsyncThunk(
    "blog/delete",
    async ({id})=>{
        await blogService.remove(id)
        return{id}
    }
)

const blogSlice = createSlice({
    name:"blogs",
    initialState,
    extraReducers:{
        [getBlogs.fulfilled]:(state,action)=>{
            return [...action.payload]
        },
        [saveBlog.fulfilled]:(state,action)=>{
            state.unshift(action.payload);
        },
        [updateBlog.fulfilled]:(state,action)=>{
            const index = state.findIndex(({id}) => id === action.payload.id);
            console.log(action.payload)
            state[index] = {
                ...state[index],
                ...action.payload
            }
        },
        [deleteBlog.fulfilled]:(state,action)=>{
            let index = state.findIndex(({id})=>id===action.payload.id);
            state.splice(index,1)
        }
    }
})

const {reducer} = blogSlice;
export default reducer;
