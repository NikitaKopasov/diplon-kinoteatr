import {React, useContext, useState, useEffect} from 'react';
import NavBar from '../templates/header';
import { Context } from '..';
import '../assets/css/profile.scss'
import logoProf from '../assets/images/logoProfil.jpg'
import card from "../assets/images/CardAdd.png"
import CardForm from "../assets/script/CreditCardForm"
import { GetSubTypes, getUserSub, subOrder } from '../http/subApi';
import { getUserCard, deleteUserCard } from '../http/cardApi';
import { useLocation } from 'react-router-dom';
import { useMaskito } from '@maskito/react';
import CardImg from "../assets/images/card.jpg"
import rightArrow from "../assets/images/right-arrow.png"
import leftArrow from "../assets/images/left-arrow.png"
import { updateUserInfo } from '../http/userApi';
const Profile = () => {

    const {user} = useContext(Context);
    const [activeSection, setActiveSection] = useState('main');
    const [error, setError] = useState();
    const [cards, setCards] = useState([]);
    const [subs, setSubs] = useState([]);
    const [activeSub, setActiveSub] = useState({})
    

    useEffect(()=> {
        GetSubTypes().then((res) => {
            if (res) {
                setSubs(res.data);
            } else {
                setError("Категории не найдены");
            }
        }).catch((error) => {
            setError("Ошибка при загрузке данных");
            console.error(error);
        });
        getUserCard(user.user.id).then((res)=> {
            if(res) {
                setCards(res.data)
            }
        }).catch((e) => {
            setError(e.response.data.message);
        })
        getUserSub(user.user.id).then((res) => {
            if(res) {
                setActiveSub(res.data)
            }
        })
    },
    [])

    const [name, setName] = useState(user.user.name);
    const [surname, setSurname] = useState(user.user.surname);
    const [email, setEmail] = useState(user.user.email);
    const [phone, setPhone] = useState(user.user.phone);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.section) {
            setActiveSection(location.state.section);
        }
    }, [location.state]);

    const phoneOptions = {
        mask: [
            '+', '7', ' ',
            '(', /\d/, /\d/, /\d/, ')', ' ',
            /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
        ],
        overwriteMode: 'replace',
    };
    const phoneInputRef = useMaskito({ options: phoneOptions });

    const [cardIndex, setCardIndex] = useState(0); // Для индекса активной карты

    const nextCard = () => {
        setCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevCard = () => {
        setCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    const handleDeleteCard = async () => {
        try {
            const cardId = cards[cardIndex]?.id;
            if (cardId) {
                await deleteUserCard(cardId);
                const updatedCards = cards.filter((_, idx) => idx !== cardIndex);
                setCards(updatedCards);
                setCardIndex(0); 
            }
        } catch (e) {
            setError("Ошибка при удалении карты");
        }
    };
    const maskCardNumber = (number) => {
        if (!number) return '';
        const lastFour = number.slice(-4);
        return `**** **** **** ${lastFour}`;
      };

      const handleSave = async () => {
        try {
            const updatedUser = {
                id: user.user.id,
                name,
                surname,
                email,
                phone,
            };
            const res = await updateUserInfo(updatedUser);
            alert('Данные успешно обновлены');

            window.location.reload()
        } catch (e) {
            setError("Ошибка при обновлении данных");
            console.error(e);
        }
    };

    const orderToSub = async(order) => {
        try {
            const message = await subOrder(order)

            alert(message)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload()
    }
    return(
        
        <div className='profile'>
            <NavBar/>
            <div className="fon-profile">
                <div className="test">123</div>
                {activeSection !== 'addCard' && (
                    <div className="profil-category">
                        <div className='container-logo'>
                            <img src={logoProf} className='logoProfil' />
                        </div>
                        <div className="cont-prof">
                            <button className="name-profile" onClick={() => setActiveSection('main')}>
                                {user.user.name + ' ' + user.user.surname}
                            </button>
                        </div>
                        <div className="container-button-cat-profil">
                            <button className="button-cat-profil" onClick={() => setActiveSection('history')}>История просмотра</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('purchases')}>История покупок</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('subscriptions')}>Подписки</button><br />
                            <button className="button-cat-profil" onClick={() => setActiveSection('edit')}>Редактирование</button><br />
                            <button className="button-cat-profil" onClick={() => logOut()}>Выход</button>
                        </div>
                        <div className="container-sub-arrange">
                             {
                                activeSub && activeSub.subscribe ? (
                                    <div className="sub-arrange-active">
                                        <span className='info-sub-title'>{activeSub.subscribe.title}</span>
                                        <span className='info-sub-date'>Дата активации:</span>
                                        <span className='info-sub-date'>{activeSub.dateIn}</span>
                                        <span className='info-sub-date__info-sub-date1'>Дата окончания: </span>
                                        <span className='info-sub-date'>{activeSub.dateOut}</span>
                                        
                                    </div>
                                ) : (
                                    <button className="sub-arrange" onClick={() => setActiveSection('subscriptions')}>
                                        <span className="arrange-text">Оформить</span>
                                        <span className="arrange-text">подписку</span>
                                    </button>
                                )
                             }
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
                                {cards.length > 0 ? (
                                    <div className="card-add">
                                        <div className="card-slider">
                                            <button className="slider-arrow left" onClick={prevCard}>
                                                <img src={leftArrow} alt="Назад" />
                                            </button>

                                            <div className="card-preview">
                                                <img src={CardImg} className="card-background" />
                                                <div className="card-number">
                                                {maskCardNumber(cards[cardIndex]?.cardNumber)}
                                                </div>
                                                <div className="card-owner">
                                                {cards[cardIndex]?.cardOwner}
                                                </div>
                                            </div>

                                            <button className="slider-arrow right" onClick={nextCard}>
                                                <img src={rightArrow} />
                                            </button>
                                        </div>
                                        <div className="card-actions">
                                            <button className="delete-card-btn" onClick={handleDeleteCard}>
                                                Удалить карту
                                            </button>
                                            <button className="card-button" onClick={() => setActiveSection('addCard')}>
                                                <img src={card} />
                                                <span>Добавить карту</span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-add">
                                        <button className="card-button" onClick={() => setActiveSection('addCard')}>
                                            <img src={card} alt="card" />
                                            <span>Добавить карту</span>
                                        </button>
                                    </div>
                                )}
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
                                {subs.map(sub => (
                                    <div className="subscriptions-info" key={sub.id}>
                                    <div className="block-sub"></div>
                                    <div className="container-sun-info">
                                        <div className="sub-content">
                                            <p className="sub-title">{sub.title}</p>
                                            <div className="sub-duration-description">
                                                <p>{sub.duration} дней</p>
                                                <p>{sub.description}</p>  
                                            </div>     
                                        </div>                                 

                                        <div className="sub-price-wrapper">
                                            {sub.sale ? (
                                                <div className="sub-price">
                                                    <p className="old-price">{sub.price} руб.</p>
                                                    <p className="old-new-price">{sub.salePrice} руб.</p>
                                                </div>
                                            ) : (
                                                <div className="sub-price">
                                                    <p className="new-price">{sub.price} руб.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <hr className="dashed-line" />
                                    <button onClick = {() => {
                                        if (sub.sale) {
                                            const order = {
                                                userId:user.user.id,
                                                subId:sub.id,
                                                duration:sub.duration,
                                                price:sub.salePrice,
                                            }

                                            orderToSub(order)

                                        } else {
                                            const order = {
                                                userId:user.user.id,
                                                subId:sub.id,
                                                duration:sub.duration,
                                                price:sub.price,
                                            }

                                            orderToSub(order)
                                        }
                                    }} className="button-sun-info">
                                        Оформить
                                    </button>
                                </div>
                                ))}
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
                                <div>
                                    <input
                                        className="edit-profile"
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        ref={phoneInputRef}
                                    />
                                </div>
                            </form>
                            <button type="button" className="save-profile" onClick={handleSave}>Сохранить</button>
                        </div>
                    )}

                    {activeSection === 'addCard' && (
                    <div className="">
                        <button className="back-card" onClick={() => setActiveSection('main')}>Назад</button>
                        <CardForm/>
                    </div>
                    )}
                </div>
            </div>
        </div>
        
    )
}

export default Profile;