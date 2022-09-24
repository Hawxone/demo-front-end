import http from "../public/src/http-common";

const getAll = ()=>{
    return http.get(`/blog`)
}

const get = id =>{
    console.log(id)
    return http.get(`/blog/${id}`)
}

const saveBlog = (formData)=>{
    return http.post(`/blog`,formData,{
        headers:{
            "Content-Type":"application/json"},
    })
}

const update = (id,formData)=>{
    return http.put(`/blog/${id}`,formData,{
        headers:{
            "Content-Type":"application/json"},
    })
}

const remove = (id)=>{
    return http.delete(`/blog/${id}`)
}

const BlogService = {
    getAll,saveBlog,get,update,remove
}

export default BlogService;
