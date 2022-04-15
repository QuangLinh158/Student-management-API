import axios from "axios";
import store from './../store/index';
import { hideLoading, showLoading } from "react-redux-loading-bar";
//đầu tiên tạo api

//1-api.tạo đường dẫn
const url = {
    baseUrl: "https://restfulapi.dnd-group.net/api",
    login: "/login",
    majors: "/majors",
    instructors: "/instructors",
    students: "/students",
};

//3-api.tao instance
const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//interceptors
instance.interceptors.request.use((request) => {
    const state = store.getState();
    if( state.auth.token){
        request.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    store.dispatch(showLoading());
    return request;
});
instance.interceptors.response.use(
    (response) => {
        setTimeout(() => store.dispatch(hideLoading()), 200);
        return response.data;
    },
    (error) => {
        setTimeout(() => store.dispatch(hideLoading()), 200);
        if(!error.response) {
            window.location.href="/no-internet";
        }
        else{
            switch(error.response.status) {
                case 401:
                    window.location.href = "/login";break;
                case 403:
                    window.location.href = "/no-permission";break;
                default: break;
            }
            return Promise.reject(error);
        }
    }
);

//2-api.
const api = {
    url,
    //4-api
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch,
};

export default api;