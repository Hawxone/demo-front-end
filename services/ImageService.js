import http from "../public/src/http-common";

const getAll = ()=>{
    return http.get(`/book`)
}

const get = order=>{
    return http.get(`/book/${order}`)
}

const getSize = ()=>{
    return http.get(`/book/size`)
}

const saveImage = data =>{
    console.log(data)
    return http.post(`/book/single`, data,{
        headers:{
            "Content-Type":"application/json"},
    })
}

const ImageService = {
    getAll,get,getSize,saveImage
}

export default ImageService
