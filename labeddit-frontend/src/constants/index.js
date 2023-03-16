import axios from "axios"

export const BASE_URL = 'https://labeddit-backend-kn7y.onrender.com'


export const Login = (body) => {
    return axios.post(`{BASE_URL}/users/login`, body )
}

export const Signup = (body) => {
    return axios.post(`{BASE_URL}/users/signup`, body )
}