import {React, useContext, useState, useEffect} from 'react';
import NavBar from '../templates/header';
import { Context } from '..';
import '../assets/css/profile.css'
import logoProf from '../assets/images/logoProfil.jpg'
import card from "../assets/images/CardAdd.png"
import CardForm from "../assets/script/CreditCardForm"
import { GetSubTypes } from '../http/subApi';

const Profile = () => {

    const {user} = useContext(Context);
    console.log(user)
    const [activeSection, setActiveSection] = useState('main');
    const [error, setError] = useState()
    const [subs, setSubs] = useState([]);

    useEffect(()=> {
        GetSubTypes().then((res) => {
            if (res) {
                console.log(res.data)
                setSubs(res.data);
            } else {
                setError("Категории не найдены");
            }
        }).catch((error) => {
            setError("Ошибка при загрузке данных");
            console.error(error);
        });
    },
    [])

    const [name, setName] = useState(user.user.name);
    const [surname, setSurname] = useState(user.user.surname);
    const [email, setEmail] = useState(user.user.email);
    const [phone, setPhone] = useState(user.user.phone);

    return(
        
        <div className='profile'>
            <NavBar/>
            <div className="fon-profile">
                <div className="test">123</div>
            {activeSection !== 'addCard' && (
                    <div className="profil-category">
                        <div className='container-logo'>
                            <img src={logoProf} className='logoProfil'></img>
                            
                        </div>
                        <div className="cont-prof" onClick={() => {setActiveSection('main')}}>
                            <span className="name-profile">{user.user.name + ' ' + user.user.surname}</span>
                        </div>
                        <div className="container-button-cat-profil">
                            <button className="button-cat-profil" onClick={() => setActiveSection('history')}>История просмотра</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('purchases')}>История покупок</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('subscriptions')}>Подписки</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('edit')}>Редактирование</button><br />
                            <button className="button-cat-profil">Выход</button>
                        </div>
                        <div className="container-sub-arrange">
                            <button className="sub-arrange" >
                                <span className="arrange-text">Оформить</span>
                                <span className="arrange-text">подписку</span>
                            </button>
                        </div>
                    </div>
                 )}
                <div className={`profil-info ${activeSection === 'addCard' ? 'full-width' : ''}`}>
                    
                    {activeSection === 'main' && (
                        <>
                            <p className="zag-info">Добро пожаловать</p>
                            <div className="profile-main-wrapper">
                                <div className="info-profile-user">
                                    <div className="profile-data">
                                        {user.user.name}
                                    </div>
                                    <div className="profile-data">
                                        {user.user.surname}
                                    </div>
                                    <div className="profile-data">
                                        {user.user.email}
                                    </div>
                                    <div className="profile-data">
                                        {user.user.phone}
                                    </div>
                                </div>
                                <div className="card-add">
                                    <button className="card-button" onClick={() => setActiveSection('addCard')}>
                                        <img src={card} alt="card" />
                                        <span>Добавить карту</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {activeSection === 'history' && (
                        <div className="info-profile-user">
                            <p className="zag-info">История просмотра</p>
                            <div className="history-buttons">
                                <button className="button-history">Завершённые</button>
                                <button className="button-history button-history-viewing">
                                    <span>Продолжить</span>
                                    <span>просмотр</span>
                                </button>
                                <button className="button-history">Буду смотреть</button>
                                <button className="button-history">Понравившиеся</button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'purchases' && (
                        <div className="info-profile-user">
                            <p className="zag-info">История покупок</p>
                            
                        </div>
                    )}

                    {activeSection === 'subscriptions' && (
                        <div className="info-profile-user">
                            <p className="zag-info">Подписки</p>
                            <div className="card-sub">
                                <div className="subscriptions-info">
                                    <div className="block-sub"></div>
                                        <div className="container-sun-info">

                                        </div>
                                        <hr className="dashed-line" />
                                        <button className="button-sun-info">
                                            Оформить
                                        </button>
                                </div>

                                <div className="subscriptions-info">
                                    <div className="block-sub"></div>
                                        <div className="container-sun-info">

                                        </div>
                                        <hr className="dashed-line" />
                                        <button className="button-sun-info">
                                            Оформить
                                        </button>
                                    
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'edit' && (
                        <div className="info-profile-user">
                            <p className="zag-info">Редактирование</p>
                            <form className="form-edit" >
                                <div>
                                    <input
                                        className="edit-profile"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className="edit-profile"
                                        type="text"
                                        value={surname}
                                        onChange={e => setSurname(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className="edit-profile"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {activeSection === 'addCard' && (
                    <div className="">
                        <CardForm/>
                    </div>
                    )}
                </div>
            </div>
        </div>
        
    )
}

export default Profile;