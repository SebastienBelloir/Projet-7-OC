// utilisation d'axios pour nous permettre de communiquer avec notre API.

import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('access_token')
        }
    });
}
