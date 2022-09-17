import http from "../public/src/http-common";

const getAll = () => {
    return http.get(`/category`)
};

const CategoryService = {
    getAll
}

export default CategoryService;
