import {React, useContext} from 'react';
import NavBar from '../templates/header';
import { Context } from '..';
import '../assets/css/profile.css'
import logoProf from '../assets/images/logoProfil.jpg'
import card from "../assets/images/CardAdd.png"

const Profile = () => {

    const {user} = useContext(Context);
    console.log(user)
    
    return(
        
        <div className='app'>
            <NavBar/>
            <div className="fon-profile">
                <div className="profil-category">
                    <div className='container-logo'>
                        <img src={logoProf} className='logoProfil'></img>
                        
                    </div>
                    <div className="cont-prof">
                        <span className="name-profile">{user.user.name + ' ' + user.user.surname}</span><br></br>
                    </div>
                    <div className="container-button-cat-profil">
                        <button className="button-cat-profil">История просмотра</button><br></br>
                        <button className="button-cat-profil">История покупок</button><br></br>
                        <button className="button-cat-profil">Подписки</button><br></br>
                        <button className="button-cat-profil">Редактирование</button><br></br>
                        <button className="button-cat-profil">Выход</button>
                    </div>
                    <div className="container-sub-arrange">
                        <button className="sub-arrange">
                            <span className="arrange-text">Оформить</span>
                            <span className="arrange-text">подписку</span>
                        </button>
                    </div>
                </div>
                <div className="profil-info">
                    <div>
                        <p className="zag-info">Добро пожаловать</p>
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
                        </div>
                    </div>
                    <div className="card-add">
                        <button className="card-button">
                            <img src={card} alt="card" />
                            <span>Добавить карту</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile;