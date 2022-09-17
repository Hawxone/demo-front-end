import http from "../public/src/http-common";


const getAll = ()=>{
    return http.get(`/product`)
}

const get = id=>{
    return http.get(`/product/${id}`)
}

const saveProduct = data=>{
    return http.post(`/product`,data)
}

const uploadProducts = file =>{
    let formData = new FormData();
    formData.append("file", file);
    return http.post(`/product/upload`,formData,{
        headers:{
            "Content-Type":"multipart/form-data"},
    })
}

const update = (id,data)=>{
    return http.put(`/product/${id}`,data)
}

const remove = (id)=>{
    return http.delete(`/product/${id}`)
}

const ProductService = {
    getAll,get,saveProduct,update,remove,uploadProducts
}

export default ProductService;
