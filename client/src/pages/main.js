import { React, useState, useEffect } from 'react';
import '../assets/css/main-page.css';
import NavBar from '../templates/header';
import { getFilmCategories, getCategoryView } from '../http/filmApi';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_ROUTE, FILM_ROUTE } from '../utils/consts';
import ImageSlider from '../assets/script/ImageSlider';

const Main = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const res = await getFilmCategories();

                if (res && res.data) {
                    const updatedCategories = await Promise.all(
                        res.data.map(async (category) => {
                            try {
                                const viewRes = await getCategoryView(category.id);
                                return { ...category, views: viewRes.data || [] };
                            } catch (e) {
                                return { ...category, views: [] };
                            }
                        })
                    );
                    setCategories(updatedCategories);
                } else {
                    setError('Категории не найдены');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;};

    return (
        <div className="app-main">
            <NavBar />
            <section className="main-page-container">
                <ImageSlider />
                {categories.map((category) => (
                    <div key={category.id} className="category-block">
                        <h1 className="zag-category">{category.category}</h1>
                        <div className="wrapper">
                            {category.views.map((view) => (
                                <div
                                    className="card"
                                    key={view.id}
                                    onClick={() => navigate(CATEGORY_ROUTE + `/${category.category}` + FILM_ROUTE + `/${view.id}`)}
                                >
                                    <div className="poster">
                                        <img src={`http://localhost:5000/posters/${view.poster}`} alt={view.title} />
                                    </div>
                                    <div className="details">
                                        <h1>{view.title}</h1>
                                        <p className="desc">{truncateText(view.description, 150)}</p>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Main;
