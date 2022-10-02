import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import BlogService from "../../../services/BlogService";
import blogService from "../../../services/BlogService";



const initialState = {
    blogs:[],
    currentPage:0,
    totalItems:0,
    totalPages:0,
}

export const getBlogs = createAsyncThunk(
    "blog/get",
    async ()=>{
        const res = await BlogService.getAll();
        return res.data;
    }
)

export const getPaginatedBlogs = createAsyncThunk(
    "blog-paginated/get",
    async ({params})=>{

        const res = await BlogService.getAllPaginated(params);
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
            return action.payload
        },
        [getPaginatedBlogs.fulfilled]:(state,action)=>{

           return action.payload

        },
        [saveBlog.fulfilled]:(state,action)=>{
           return {...state,blogs:[...state.blogs,action.payload]}
        },
        [updateBlog.fulfilled]:(state,action)=>{
            const index = state.blogs.findIndex((blog)=>blog.id===action.payload.id);
            state.blogs[index] = {
                ...state.blogs[index],
                ...action.payload
            }
        },
        [deleteBlog.fulfilled]:(state,action)=>{
            state.blogs = state.blogs.filter((blog)=>blog.id !== action.payload);

            state.blogs.splice(state.blogs.findIndex((blog)=>blog.id===action.payload))
        }
    }
})

const {reducer} = blogSlice;
export default reducer;
