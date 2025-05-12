import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode";

export const getUserCard = async (id) => {
    const cards = await $authHost.post('/user/getUserCard', {id:id})
    return cards
}

export const addUserCard = async(data) => {
    const response = await $authHost.post("/user/addCard", data)

    return response;
}

export const deleteUserCard = async (cardId) => {
    const response = await $authHost.post('/user/deleteCard', { id: cardId });
    return response;
};