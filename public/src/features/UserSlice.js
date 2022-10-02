import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from "../../../services/UserService";








const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
const initialState= {
    loading:false,
    userInfo:null,
    accessToken,
    error:null,
    success:false
}

export const registerUser = createAsyncThunk(
    'user/register',
    async ({username,email,password},{rejectedWithValue})=>{
        try {
            await userService.register({username,email,password})
        }catch (error){
            if (error.response && error.response.data.message) {
                return rejectedWithValue(error.response.data.message)
            } else {
                return rejectedWithValue(error.message)
            }
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg,{getState,rejectedWithValue})=>{


        try {
            const user = getState().users

            const {data} = await userService.getDetail({user})

            return data
        }catch (error){
            if (error.response && error.response.data.message) {
                return rejectedWithValue(error.response.data.message)
            } else {
                return rejectedWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async ({username,password},{rejectedWithValue})=>{
        try{
            const {data} = await  userService.login({username,password})
            localStorage.setItem('accessToken',data.accessToken)

            return data

        }catch (error){
            if (error.response && error.response.data.message) {
                return rejectedWithValue(error.response.data.message)
            } else {
                return rejectedWithValue(error.message)
            }
        }
    }
)


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout: (state)=>{
            localStorage.removeItem('accessToken')
            state.loading = false
            state.userInfo = null
            state.accessToken=null
            state.error=null
        }
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.loading=true
            state.error=null
        },
        [registerUser.fulfilled]:(state,action)=>{
            state.loading=false
            state.success=true
        },
        [registerUser.rejected]:(state,action)=>{
            state.loading = false
            state.error=action.payload
        },
        [userLogin.pending]:(state)=>{
            state.loading=true
            state.error=null
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.loading=false
            state.userInfo=action.payload
            state.accessToken=action.payload.accessToken
        },
        [userLogin.rejected]:(state,action)=>{
            state.loading = false
            state.error=action.payload
        },
        [getUserDetails.pending]:(state)=>{
            state.loading = true
        },
        [getUserDetails.fulfilled]:(state,action)=>{
            state.loading = false
            state.userInfo = action.payload
        },
        [getUserDetails.rejected]:(state,action)=>{
            state.loading = false
        }

    }
})
export const {logout}  = userSlice.actions;
const {reducer} = userSlice;
export default reducer;
