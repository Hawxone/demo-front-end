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

const ImageService = {
    getAll,get,getSize
}

export default ImageService
