const API = 'http://localhost:8080/api/v1/user'

export async function getUsers() {
    return fetch(API)
        .then(res => res.json()) // 把response轉換為response.json後傳遞給result
        .then(result => {
            return result
        });
}

export async function getUser(id) {
    return fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(result => {
            return result;
        })
}

export async function createUser(body) {
    return fetch(API, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => console.log(res))
}

export async function updateUser(id, body) {
    console.log(id, body)
    return fetch(`${API}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => console.log(res))
}

export async function deleteUser(id) {
    // fetch 裡面裝的就是 URL
    return fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
    .then(res => console.log(res))
}
