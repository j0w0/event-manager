import tokenService from '../utils/tokenService';

const BASE_URL = '/api/events';

export async function getAll() {
    return fetch(BASE_URL, {}).then(res => res.json());
}

export async function getOne(id) {
    return fetch(`${BASE_URL}/${id}`).then(res => res.json());
}

export async function create(post) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(post)
    }).then(res => res.json());
}

export async function update(post) {
    return fetch(`${BASE_URL}/${post._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(post)
    }).then(res => res.json());
}

export async function deleteOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export async function uploadImage(files) {
    const formData = new FormData();
    formData.append('event-image', files[0], files[0].name);

    return fetch(`${BASE_URL}/upload-image`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: formData
    }).then(res => res.json());
}