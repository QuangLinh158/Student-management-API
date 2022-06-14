import api from "./api";

const list = () => api.get(api.url.students);
const get = (id) => api.get(`${api.url.students}/${id}`);
// const add = (data) => api.post(api.url.students,data);
const add = (data) => {
    const formData = new FormData();
    for(const key in data) formData.append(key, data[key]);
    return api.post(api.url.students, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
// const update = (id, data) => api.put(`${api.url.students}/${id}`,data);
const update = (id, data) => {
    const formData = new FormData();
    for(const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.students}/${id}`,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
const remove = (id) => api.delete(`${api.url.students}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.students}/avatar-url/${id}`);
const getAvatarBase64 = (id) => api.get(`${api.url.students}/avatar-base64/${id}`);
const getAvatar = (id) => api.get(`${api.url.students}/avatar/${id}`,{
    responseType: "blob",
});
const downloadAvatar = (id) => api.get(`${api.url.students}/download-avatar/${id}`,{
    responseType: "blob",
});
const getPaging = (pageNum, pageLength, searchText) => {
    const queryString = `page=${pageNum}&pageLength=${pageLength}&search=${searchText}`;
    return api.get(`${api.url.students}/get-paging?${queryString}`);
}

const studentService = {
    list,
    get,
    getAvatarUrl,
    getAvatarBase64,
    getAvatar,
    getPaging,
    add,
    update,
    downloadAvatar,
    delete: remove,
}

export default studentService;