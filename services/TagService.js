import http from "../public/src/http-common";

const getAll = ()=>{
    return http.get(`/tag`)
}


const TagService = {
    getAll
}

export default TagService
