import { tokenToCSSVar } from "@chakra-ui/react"
import axios from "axios"

export const BASE_URL = 'https://labeddit-backend-irrb.onrender.com'

export const Login = async (body) => {
    const {data} = await axios.post(`${BASE_URL}/users/login`, body )
    return data
}

export const Signup = async (body) => {
    const {data} = await axios.post(`${BASE_URL}/users/signup`, body )
    return data
}

export const Posts = async () => {
    const {data} = await axios.get(`${BASE_URL}/posts`, 
    {
        headers: {
            Authorization: localStorage.getItem("labeddit.token")
        } 
    })
    return data
}

export const ReplyContent = async () => {
    const {data} = await axios.get(`${BASE_URL}/posts`, 
    {
        headers: {
            Authorization: localStorage.getItem("labeddit.token")
        } 
    })
    return data
}

export const validateEmail = email => /[a-zA-Z0-9]+@[a-z0-9]{3}[.a-z]?/.test(email)
export const validatePassword = password => /.{6,}/.test(password)
export const validateName = name => /.{3,}/.test(name)

