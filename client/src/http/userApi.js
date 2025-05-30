import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode";

// Авторизация
export const getLogin = async (email, password) => {
    const { data } = await $host.post('user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

// Проверка токена
export const check = async () => {
    const { data } = await $authHost.get('user/check');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

// Регистрация
export const registerUser = async (candidate) => {
    const message = await $authHost.post('user/register', candidate);
    return message;
};

// Обновление информации о пользователе
export const updateUserInfo = async (userData) => {
    const { data } = await $authHost.post('user/update', userData);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

// Получить список избранного
export const getFavorites = async (userId) => {
    const { data } = await $authHost.post('user/getFavorites', { userId });
    return data;
};

// Добавить в избранное
export const addToFavorites = async (filmId, userId) => {
    const { data } = await $authHost.post('user/addToFavorites', { filmId, userId });
    return data;
};

// Удалить из избранного
export const deleteFromFavorites = async (filmId, userId) => {
    const { data } = await $authHost.post('user/deleteFromFavorites', { filmId, userId });
    return data;
};

// Получить список «Буду смотреть»
export const getWillWatching = async (userId) => {
    const { data } = await $authHost.post('user/getWillWatching', { userId });
    return data;
};

// Добавить в «Буду смотреть»
export const addToWillWatching = async (filmId, userId) => {
    const { data } = await $authHost.post('user/addToWillWatching', { filmId, userId });
    return data;
};

// Удалить из «Буду смотреть»
export const deleteFromWillWatching = async (filmId, userId) => {
    const { data } = await $authHost.post('user/deleteFromWillWatching', { filmId, userId });
    return data;
};
