const axios = require('axios')
const faker = require('faker')


const projects = [1]
const LEVELS = ['warn', 'info', 'error'];
const TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJMb2dNYW5hZ2VyIiwiZXhwIjoxNTk1MzgwNDExLCJpYXQiOjE1OTI5NjEyMTEsImlzcyI6IkxvZ01hbmFnZXIiLCJqdGkiOiI5NTNmYWU3Ny1hNjlhLTRkMjMtYWIyZS00NWRjNDcwMzcxYjkiLCJuYmYiOjE1OTI5NjEyMTAsInN1YiI6IjEiLCJ0eXAiOiJhY2Nlc3MifQ.j2ldlzzCegFGq-8P0LMOXI_42bf9qRJeSsr-1bT55GnQxzVT7NwbKjBLgLh-ZSA52KhCZcO5EEOJAScfwGomOw"
function generateRequestData() {
    return {
        "log_message": {
            "level": LEVELS[Math.floor(Math.random() * 3)],
            "title": "PresentationTest",
            "message": faker.company.catchPhrase(),
            "context": {
                "user": {
                    "id": Math.floor(Math.random() * 10000)
                }
            }
        }
    }
}

let timer = setInterval(() => {
    let projectId = projects[Math.floor(Math.random() * projects.length)]
    let url = `http://localhost:4000/api/v1/commit?project_id=${projectId}`
    axios.post(url, generateRequestData(), {
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json',
            "Authorization": `Bearer ${TOKEN}`
        }
    }).then(resp => {
      //  console.log(resp)
    })
}, 1000)
