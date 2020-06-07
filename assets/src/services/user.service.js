import http from "../http-common";

// handle errors and unwrap data
http.interceptors.response.use(response => {
    // phoenix api wrapped in `data`
    return response.data.data;
}, error => {
    return Promise.reject(error)
})

class UserDataService {
    async me() {
        let user = await http.get("/me")
    }
    // async getAll() {
    //     let users = await http.get("/users");
    //     return users;
    // }

    // async get(id) {
    //     let book = await http.get(`/users/${id}`);
    //     return book;
    // }

    // async create(data) {
    //     let payload = { book: data }
    //     let book = await http.post("/users", payload);
    //     return book;
    // }

    // async update(id, data) {
    //     let payload = { book: data }
    //     let book = await http.put(`/users/${id}`, payload)
    //     return book;
    // }

    // async delete(id) {
    //     return http.delete(`/users/${id}`);
    // }

    // async deleteAll() {
    //     return http.delete(`/users`);
    // }

    // async findByTitle(title) {
    //     return http.get(`/users?title=${title}`);
    // }
}
const userService = new UserDataService();
export default userService;