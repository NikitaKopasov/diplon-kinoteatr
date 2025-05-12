import { $host, $authHost } from ".";

export const getFilmCategories =  async () => {
    const categories = await $host.get('films/getCategories')

    return categories;
}

export const getCategoryView = async (categoryId) => {
    const view = await $host.post('films/getCategoryView', {categoryId: categoryId}); 

    return view;
}

export const getOneFilm = async(id) => {
    const film = await $host.post('films/getOneFilm', {id:id})

    return film;
}