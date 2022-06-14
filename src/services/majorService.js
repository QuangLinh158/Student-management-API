import api from "./api";

const list = () => api.get(api.url.majors);
const get = (id) => api.get(`${api.url.majors}/${id}`);
const add = (data) => api.post(api.url.majors, data);
const update = (id, data) => api.put(`${api.url.majors}/${id}`, data);
const remove = (id) => api.delete(`${api.url.majors}/${id}`);
const getPaging = (pageNum, pageLength, searchText) => {
    const queryString = `page=${pageNum}&pageLength=${pageLength}&search=${searchText}`;
    return api.get(`${api.url.majors}/get-paging?${queryString}`);
}
const majorService = {
    list,
    get,
    getPaging,
    add,
    update,
    delete: remove,
};
 
export default majorService;