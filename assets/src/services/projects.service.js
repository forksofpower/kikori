import http from "../http-common";

export default axios.create({
    baseURL: "http://localhost:4000/api/v1"
});


// handle errors and unwrap data
// http.interceptors.response.use(response => {
//     // phoenix api wrapped in `data`
//     return response.data.data;
// }, error => {
//     return Promise.reject(error)
// })

const path = '/projects';
const getOptions = () => {
    let token = getToken();
    if (token) {
        return {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    } else {
        return {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            }
        }
    }
}

class ProjectDataService {
    async getAll() {
        let projects = await http.get(path, getOptions());
        return projects;
    }

    async getOne(id) {
        let book = await http.get(`${path}/${id}`, getOptions());
        return book;
    }

    async create(data) {
        let token = getToken()
        let payload = { book: data }
        let book = await http.post("/users", payload);
        return book;
    }

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
const projectService = new ProjectDataService();
export default projectService;

function getToken() {
    return localStorage.get('token')
}