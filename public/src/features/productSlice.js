import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import ProductService from "../../../services/ProductService";
import productService from "../../../services/ProductService";

const initialState=[];


export const getProducts = createAsyncThunk(
    "product/get",
    async () =>{
        const res = await ProductService.getAll();
        return res.data;
    }
)

export const saveProduct = createAsyncThunk(
    "product/post",
     async ({name,categoryId,category,price,timestamp})=>{
        const res = await ProductService.saveProduct({name,categoryId,category,price,timestamp});
        console.log(res)
        return res.data;
     }
)

export const uploadProduct = createAsyncThunk(
    "product/upload",
    async (file)=>{
        const res = await productService.uploadProducts(file)
        return res.data;
    }
)

export const updateProduct = createAsyncThunk(
    "product/update",
    async ({id,data})=>{
        const res = await productService.update(id,data);
        return res.data;
    }
)

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async ({id})=>{
        await productService.remove(id)
        return{id}
    }
)

const productSlice = createSlice({
    name:"products",
    initialState,
    extraReducers:{
       [getProducts.fulfilled]:(state,action)=>{
           return [...action.payload]
       },
        [saveProduct.fulfilled]:(state,action)=>{
           state.unshift(action.payload);
        },
        [uploadProduct.fulfilled]:(state,action)=> {
            state.unshift(...action.payload);
        },
        [updateProduct.fulfilled]:(state,action)=>{
           const index = state.findIndex(product => product.id === action.payload.id);
           state[index] = {
               ...state[index],
               ...action.payload
           }
        },
        [deleteProduct.fulfilled]:(state,action)=>{
            let index = state.findIndex(({id})=>id===action.payload.id);
            state.splice(index,1)
        }
    }
})

const {reducer} = productSlice;
export default reducer;



