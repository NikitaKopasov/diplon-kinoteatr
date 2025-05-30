import { React, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../templates/header';
import { getFilmRates, getOneFilm, postFilmRate } from '../http/filmApi';
import "../assets/css/film.scss";
import play from "../assets/images/play.png"
import { check } from '../http/userApi';
import { Context } from '..';
import starGray from "../assets/images/star.png"
import starYellow from "../assets/images/starYellow.png"
import heart from "../assets/images/Heart.png"
import favourites from "../assets/images/favourites.png"
import favouritesAdd from "../assets/images/favouritesAdd.png"
import likeAdd from "../assets/images/likeAdd.png"
import Footer from '../templates/footer';
import {
  getFavorites,
  addToFavorites,
  deleteFromFavorites,
  getWillWatching,
  addToWillWatching,
  deleteFromWillWatching
} from '../http/userApi'
const FilmPage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [averageRate, setAverageRate] = useState(0);
    const [rates, setRates] = useState([]);

    const [newRate, setNewRate] = useState(10);
    const [newText, setNewText] = useState("");

    const [isAuth, setIsAuth] = useState(false); // Проверка авторизации
    const {user} = useContext(Context);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isWillWatch, setIsWillWatch] = useState(false);


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
        getFilmRates(id)
            .then((res) => {
                if (res && res.data) {
                    setRates(res.data)
                }
                const totalRate = res.data.reduce((sum, item) => sum + item.rate, 0);
                const average = totalRate / res.data.length;
                setAverageRate(average);
            })
            .catch((e) => {
                setAverageRate(0)
                setError(e.response?.data?.message || "Коментарии не найдены");
            })
            if (user?.user?.id) {
        getFavorites(user.user.id).then((favorites) => {
            const fav = favorites.some(f => f.id === parseInt(id));
            setIsFavorite(fav);
        });

        getWillWatching(user.user.id).then((willWatchList) => {
            const will = willWatchList.some(f => f.id === parseInt(id));
            setIsWillWatch(will);
        });
}

    }, [id]);

    const handleToggleFavorite = async () => {
    if (!isAuth) return alert("Необходимо авторизоваться");

    try {
        if (isFavorite) {
            await deleteFromFavorites(film.id, user.user.id);
        } else {
            await addToFavorites(film.id, user.user.id);
        }
        setIsFavorite(!isFavorite);
    } catch (err) {
        console.error("Ошибка при изменении избранного", err);
    }
};

const handleToggleWillWatch = async () => {
    if (!isAuth) return alert("Необходимо авторизоваться");

    try {
        if (isWillWatch) {
            await deleteFromWillWatching(film.id, user.user.id);
        } else {
            await addToWillWatching(film.id, user.user.id);
        }
        setIsWillWatch(!isWillWatch);
    } catch (err) {
        console.error("Ошибка при изменении списка 'Буду смотреть'", err);
    }
};

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

    // Проверка авторизации с использованием токена из localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    const handleSubmitReview = async () => {
        if (!newText.trim()) return alert("Напишите отзыв");

        if (!isAuth) {
            return alert("Для добавления отзыва необходимо авторизоваться");
        }

        try {
            const rateData = {
                userId: user.user.id,
                filmId: id,
                rate: newRate,
                text: newText
            };

            await postFilmRate(rateData);
            const updatedRates = await getFilmRates(id);
            setRates(updatedRates.data);
            setNewRate(5);
            setNewText("");
        } catch (e) {
            setError(e.response?.data?.message || "Ошибка при добавлении отзыва");
        }
    };

    // Получение фильма и отзывов
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
        getFilmRates(id)
            .then((res) => {
                if (res && res.data) {
                    setRates(res.data);
                }
                const totalRate = res.data.reduce((sum, item) => sum + item.rate, 0);
                const average = totalRate / res.data.length;
                setAverageRate(average);
            })
            .catch((e) => {
                setError(e.response?.data?.message || "Коментарии не найдены");
            });
    }, [id]);
    return (
        <div className='film-app'>
            <NavBar />
            <div className='film-main-container'>
                <div className='container-title'>
                    <p className='title-film'>{film.title}</p>
                </div>
                <div className='film-info'>
                    <div className='film-rivew'>
                        <img
                            src={`http://localhost:5000/posters${film.poster}`}
                            alt={film.title}
                            className='poster-film'
                        />
                        <p className="average-rate">{averageRate.toFixed(1)}</p>
                    </div>
                    <div className='film-date'>
                        {user.isAuth && (
                            <div className='like-favourites'>
                                <div className='like' onClick={handleToggleFavorite} style={{ cursor: "pointer" }}>
                                    <p>Понравилось</p>
                                    <img src={isFavorite ? likeAdd : heart} alt="Избранное" />
                                </div>
                                <div className='favourites' onClick={handleToggleWillWatch} style={{ cursor: "pointer" }}>
                                    <p>Буду смотреть</p>
                                    <img src={isWillWatch ? favouritesAdd : favourites} alt="Буду смотреть" />
                                </div>
                            </div>
                        )}
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
                        <div className="average-stars">
                            {[...Array(10)].map((_, index) => (
                                <img
                                key={index}
                                src={index < Math.round(averageRate) ? starYellow : starGray}
                                alt="star"
                                className="star"
                                />
                            ))}
                            
                        </div>
                        <div className='otziv'>
                        {isAuth ? (
                                <div className='add-review-form'>
                                    <h3>Оставить отзыв</h3>
                                    <div>
                                        <label className="text-review">
                                            Оценка (0–10):
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={newRate}
                                                onChange={(e) => {
                                                    if (Number(e.target.value) > 10) {
                                                        setNewRate(10)
                                                    } else {
                                                        setNewRate(Number(e.target.value))
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <br />
                                    <label>
                                        Текст отзыва:
                                        <textarea
                                            value={newText}
                                            onChange={(e) => setNewText(e.target.value)}
                                            rows="4"
                                        />
                                    </label>
                                    <br />
                                    <button onClick={handleSubmitReview}>Отправить отзыв</button>
                                </div>
                            ) : (
                                <p>Для добавления отзыва необходимо <a href="/login">войти</a>.</p>
                            )}
                            <p className='title-otziv'>Отзывы</p>
                            {rates.length === 0 && <p>Отзывов пока нет.</p>}
                                {rates.map((r, index) => (
                                    <div key={index} className='review'>
                                        
                                        <p className='review-user'>
                                            <strong>
                                                {r.user ? `${r.user.name} ${r.user.surname}` : "Аноним"} 
                                            </strong> — Оценка: {r.rate}/10
                                        </p>
                                        <p className='review-text'>{r.text}</p>
                                        <hr />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default FilmPage;
