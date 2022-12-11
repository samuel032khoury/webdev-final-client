import axios from "axios";

const USER_API_URL = 'http://localhost:4000/users'
const BASE_API_URL = 'http://localhost:4000'

const api = axios.create({withCredentials: true});

export const findUserById = async (uid) => {
    const response = await api.get(`${USER_API_URL}/${uid}`)
    if (response.status === 404) {
        alert("The user is not found")
    }
    const user = response.data
    return user
}

export const register = async (user) => {
    const response = await api.post(`${BASE_API_URL}/register`, user)
        .catch((error) => {
            alert("Username already exists!")
        });
    return response.data
}

export const login = async (user) => {
    const response = await api.post(`${BASE_API_URL}/login`, user)
        .catch((error) => {
            alert("Make sure your credentials exist and are correct")
        });
    return response.data
}

export const logout = async () => {
    const response = await api.post(`${BASE_API_URL}/logout`)
    if (response.status === 200) {
        alert("Logged out successfully!")
    }
    return response.data
}
export const profile = async () => {
    const response = await api.post(`${BASE_API_URL}/profile`)
    return response.data
}

export const findAllUsers = async () => {
    const response = await axios.get(USER_API_URL)
    return response.data
}

export const createUser = async () => {


}

const deleteUser = async (uid) => {}
const updateUser = async (uid, username) => {}