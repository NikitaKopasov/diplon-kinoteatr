import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode";

export const getLogin = async (email, password) => {
    const {data} = await $host.post('user/login', {email, password})
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async() => {
    const {data} = await $authHost.get('user/check');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const registerUser = async(candidate) => {
    const message = await $authHost.post('user/register', candidate)

    return message;
}
export const updateUserInfo = async (userData) => {
    const { data } = await $authHost.post('user/update', userData);
    
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};