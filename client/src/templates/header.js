import React, { useEffect, useState, useContext } from 'react';
import { getFilmCategories } from '../http/filmApi';
import '../assets/css/header.css';
import logo from "../assets/images/logo.png"
import search from "../assets/images/Search.png"
import notifications from "../assets/images/notifications.png"
import persaccount from "../assets/images/PersAccount.png"
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, CATEGORY_ROUTE, MAIN_ROUTE, MYSUB_ROUTE, PROFILE_ROUTE, NOTIFICATION_ROUTE, SEARCH_ROUTE, ADMIN_ROUTE } from '../utils/consts';

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const {user} = useContext(Context)

    useEffect(() => {
        getFilmCategories(user.user.id)
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

    return (
        <div className="navbar">
            <div className='logo' onClick={() => {
                navigate(MAIN_ROUTE)
            }}>
                <img src={logo}/>
            </div>
            <div className="dropdown">
                <div className="dropbtn">
                    Фильмы ▾
                </div>
                <div className="dropdown-content">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category.id ?? `${category.category}`} onClick={() => {
                                navigate(CATEGORY_ROUTE + `/${category.category}`)
                            }}>
                                {category.category}
                            </div>
                        ))
                    ) : (
                        <div>Категории отсутствуют</div>
                    )}
                </div>
            </div>
            <button className='header-service'>
                О сервисе
            </button>
            {
                user.user.type === 'ADMIN' ? (
                    <div onClick={() => {
                        navigate(ADMIN_ROUTE)
                    }}>
                        Администрирование
                    </div>
                ) : (
                <button className='header-contacts'>
                    Контакты
                </button>)
            }
            {
                user.isSubscribe ? (
                    <div className='header-sub-btn' onClick={() => {navigate(MYSUB_ROUTE)}}>
                        Моя подписка
                    </div>
                ) : (
                    <div className='header-sub-btn' onClick={() => {navigate(PROFILE_ROUTE, { state: { section: 'subscriptions' } }); }}>
                        Оформить подписку
                    </div>
                )
            }
            <div className='header-icons'>
                <div className='icon'>
                    <img className='icon-item' src={search} onClick={() => {navigate(SEARCH_ROUTE)}}/>
                </div>
                <div className='icon'>
                    <img className='icon-item' src={notifications} onClick={() => {navigate(NOTIFICATION_ROUTE)}}/>
                </div>
                <div className='icon'>
                {
                     user.isAuth ? (
                        <div id='last' onClick={() => {
                            navigate(PROFILE_ROUTE)
                        }}>
                            <img className='account' src={persaccount}/>
                            <span>{user.user.name + ' ' + user.user.surname}</span>
                        </div>
                    ) : (
                        <div id='last' onClick={() => {
                            navigate(AUTH_ROUTE)
                        }}>
                            <img className='account' src={persaccount}/>
                            <span>Вход</span>
                        </div>
                    )
                }
                </div>
            </div>
        </div>

    );
};

export default NavBar;

