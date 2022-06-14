import api from "./api";

const list = () => api.get(api.url.instructors);
const get = (id) => api.get(`${api.url.instructors}/${id}`);
const add = (data) => api.post(api.url.instructors,data);
const update = (id, data) => api.put(`${api.url.instructors}/${id}`,data);
const remove = (id) => api.delete(`${api.url.instructors}/${id}`);
const getPaging = (pageNum, pageLength, searchText) => {
    const queryString = `page=${pageNum}&pageLength=${pageLength}&search=${searchText}`;
    return api.get(`${api.url.instructors}/get-paging?${queryString}`);
}
const instructorService = {
    list,
    get,
    getPaging,
    add,
    update,
    delete: remove,
}

export default instructorService;