import httpExternal from "../public/src/http-external";


const getAllPaginated = (params)=>{
    return httpExternal.get(`/curated`,{params})
}


const ExternalService = {
    getAllPaginated
}

export default ExternalService;
