import {React, useContext, useState, useEffect} from 'react';
import '../assets/css/main-page.css'
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import NavBar from '../templates/header';
import { getFilmCategories } from '../http/filmApi';

const Main = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState()

        useEffect(() => {
            getFilmCategories()
                .then((res) => {
                    if (res) {
                        setCategories(res.data);
                    } else {
                        setError("Категории не найдены");
                    }
                })
                .catch((error) => {
                    setError("Ошибка при загрузке данных");
                    console.error(error);
                });
            
        }, []);

    const {user} = useContext(Context);
    const navigate = useNavigate()
    return(
       <div className="app-main">
            <NavBar></NavBar>
            <section className="main-page-container">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id ?? `${category.category}`}>
                            {category.category}
                        </div>
                    ))
                    ) : (
                            <div>Категории отсутствуют</div>
                        )}
            </section>
       </div>
    )
}

export default Main;