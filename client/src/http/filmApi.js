import { $host, $authHost } from ".";

export const getFilmCategories =  async (userId) => {
    const categories = await $host.post('films/getCategories', {userId:userId})

    return categories;
}

export const getCategoryView = async (categoryId, userAge) => {
    const view = await $host.post('films/getCategoryView', {categoryId: categoryId, userAge: userAge}); 

    return view;
}

export const getOneFilm = async(id) => {
    const film = await $host.post('films/getOneFilm', {id:id})

    return film;
}

export const getFilmRates = async(id) => {
    const rates = await $host.post('films/getFilmRates', {filmId:id});

    return rates;
}

export const postFilmRate = async(rate) => {
    const message = await $authHost.post('films/postFilmRate', rate);

    return message;
}