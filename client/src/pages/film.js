import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../templates/header';
import { getOneFilm } from '../http/filmApi';
import "../assets/css/film.scss";
import play from "../assets/images/play.png"

const FilmPage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    console.log(film);

    useEffect(() => {
        getOneFilm(id)
            .then((res) => {
                if (res && res.data) {
                    setFilm(res.data);
                }
            })
            .catch((e) => {
                setError(e.response?.data?.message || "Ошибка при загрузке фильма");
            });
    }, [id]);

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    const renderDescription = () => {
        if (!film.description) return null;
        const isLong = film.description.length > 250;

        if (!isLong) return <p className='film-description'>{film.description}</p>;

        return (
            <>
                <p className='film-description'>
                    {showFullDescription
                        ? film.description
                        : film.description.slice(0, 250) + "..."}
                </p>
                <button className='read-more-btn' onClick={toggleDescription}>
                    {showFullDescription ? "Скрыть" : "Читать далее"}
                </button>
            </>
        );
    };

    return (
        <div className='film-app'>
            <NavBar />
            <div>
                <div className='container-title'>
                    <p className='title-film'>{film.title}</p>
                </div>
                <div className='film-info'>
                    <img
                        src={`http://localhost:5000/posters${film.poster}`}
                        alt={film.title}
                        className='poster-film'
                    />
                    <div className='film-date'>
                        <p className='zag-description'>Описание</p>
                        {renderDescription()}
                        <p>{film.category}</p>
                        <div className='Info-film'>
                            <p>Жанр: {film.film_category?.category}</p>
                            <p>Режисер: {film.director}</p>
                            <p>Год: {film.year}</p>
                        </div>
                        <div className='pleer'>
                            <div className="pleer-content">
                                <img src={play} alt="Play" />
                            </div>
                            <hr />
                        </div>
                        <div className='otziv'>
                            <p className='title-otziv'>Отзывы</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;
