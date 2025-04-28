import { $host, $authHost } from ".";

export const getFilmCategories =  async () => {
    const categories = await $host.get('films/getCategories')

    return categories;
}