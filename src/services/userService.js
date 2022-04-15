import api from "./api";

//truyền 2 tham só vào login
const login = (username, password) => {
    //tạo đối tượng data
    const data = {username,password};
    //trả về thêm mới(post) data
    return api.post(api.url.login, data);
}

const userService = {
    login
};
export default userService;