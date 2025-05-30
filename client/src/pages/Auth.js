import {React, useEffect, useState, useContext} from "react";
import "../assets/css/auth.css";
import authimg1 from '..//assets/images/authimg1.png'
import authimg2 from '..//assets/images/authimg2.png'
import authimg3 from '..//assets/images/authimg3.png'
import authimg4 from '..//assets/images/authimg4.png'
import eyeOpen from '../assets/images/eye-open.png'
import eyeClose from '../assets/images/eye-close.png'
import { getLogin, registerUser } from "../http/userApi";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/consts";
import { useMaskito } from '@maskito/react';
import { useImageSlider } from '../assets/script/useImageSlider';


const Auth = () => {

    const navigate = useNavigate();

    const {user} = useContext(Context);
    const [error, setError] = useState()
    const [isLoginForm, SetisLoginForm] = useState(true)
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    

    const phoneOptions = {
        mask: [
            '+', '7', ' ',
            '(', /\d/, /\d/, /\d/, ')', ' ',
            /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
        ],
        overwriteMode: 'replace',
    };
    
    const images = [authimg1, authimg2, authimg3, authimg4];
    
    const phoneInputRef = useMaskito({ options: phoneOptions });
    const { currentIndex, nextIndex, isFading } = useImageSlider(images);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // Стейт для отображения пароля

    const clear = () => {
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setError('')
    }

    const formLogin = async () => {
        try {   
            if(!email || !password) {
                setError('Зполните пустые поля')
            } else {
                const data = await getLogin(email, password)
                user.setUser(await data);
                user.setIsAuth(true);
                navigate(MAIN_ROUTE);
                window.location.reload()
            }
        } catch(e) {
            setError(e.response.data.message)
        }
    }

    const formRegister = () => {
       try {
        if (!name || !surname || !email || !phone || !password) {
            setError('Зполните пустые поля')
        } else {
            let candidate = {
                name: name,
                surname:surname,
                email:email,
                phone:phone,
                password:password
            }
            registerUser(candidate)
            alert('Регистрация успешна')
            window.location.reload()
        }
       } catch (e) {
            setError(e.response.data.message)
       }
    }

    return (
        <div className="auth-fon">
            <div className="auth-container">
            <div className="auth-card">
                <img
                    src={images[currentIndex]}
                    className={`authImg ${isFading ? 'fade-out' : 'visible'}`}
                    alt="current"
                />
                <img
                    src={images[nextIndex]}
                    className={`authImg ${isFading ? 'fade-in' : 'hidden'}`}
                    alt="next"
                />
            </div>
                    <div className="form-reg">
                        <div className="form-auth-container">
                            <div className="button-auth-reg">
                                <button className={isLoginForm ? "active" : "passive"} onClick ={() => {
                                    SetisLoginForm(true)
                                    clear()
                                }}>Вход</button>
                                <button className={isLoginForm ? "passive" : "active"} onClick={() => {
                                    SetisLoginForm(false)
                                    clear()
                                }}>Регистрация</button>
                            </div>
                            <div className="form">
                                {
                                    isLoginForm ? (
                                        <div className="login-container">
                                        <form className="form-auth">
                                                <div className="form-login">
                                                    <label for="username" className="uname">Email</label> <br />
                                                    <input id="username" value={email} onChange={(e) => {setEmail(e.target.value)}} name="username" required="required" type="email" className="input-username"></input>
                                                </div>
                                                <div className="form-password">
                                                    <label for="password" className="youpasswd">Пароль</label> <br />
                                                    <div className='input-password'>
                                                        <input
                                                            id="password"
                                                            value={password}
                                                            onChange={(e) => { setPassword(e.target.value) }}
                                                            name="password"
                                                            required="required"
                                                            type={isPasswordVisible ? "text" : "password"}  // Показываем/скрываем пароль
                                                        />
                                                        <div>
                                                            <img
                                                                src={isPasswordVisible ? eyeOpen : eyeClose}
                                                                alt="toggle visibility"
                                                                className="eye-icon"
                                                                onClick={() => setIsPasswordVisible(prev => !prev)}  // Переключение состояния
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="container-forgot-password">
                                                    <a className="forgot-password">Забыли пароль?</a>
                                                </div>
                                                <div className='error'>
                                                    {error}
                                                </div>
                                                <div className="button-auth-block">
                                                    <button onClick={(event) => {
                                                            event.preventDefault();
                                                            formLogin()
                                                        }} className="button-auth">Вход</button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="register-container">
                                            <form className="form-registration">
                                                <div className="form-name">
                                                    <label for="name" className="youname">Имя</label> <br />
                                                    <input id="name" value={name} onChange={e => setName(e.target.value)} name="name" required="required" type="text" className="input-name"></input>
                                                    </div>
                                                <div className="form-surname">
                                                    <label for="surname" className="yousurname">Фамилия</label> <br />
                                                    <input id="surnamed" value={surname} onChange={e => setSurname(e.target.value)} name="surname" required="required" type="text" className="input-surname"></input>
                                                </div>

                                                <div className="form-email">
                                                    <label for="email" className="youemail">Email</label> <br />
                                                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} name="email" required="required" type="email" className="input-email"></input>
                                                    </div>
                                                <div className="form-number">
                                                    <label for="number" className="younumber">Номер телефона</label> <br />
                                                    <input
                                                        ref={phoneInputRef}
                                                        value={phone}
                                                        onInput={(e) => setPhone(e.currentTarget.value)}
                                                        type="tel"
                                                         className="input-number"
                                                    />
                                                </div>
                                                <div className="form-reg-password">
                                                    <label for="reg-password" className="you-reg-password">Пароль</label> <br />
                                                    <div className='input-reg-password'>
                                                        <input
                                                            id="reg-password"
                                                            value={password}
                                                            onChange={e => setPassword(e.target.value)}
                                                            name="reg-password"
                                                            required="required"
                                                            type={isPasswordVisible ? "text" : "password"}
                                                        />
                                                        <div>
                                                            <img
                                                                src={isPasswordVisible ? eyeOpen : eyeClose}
                                                                alt="toggle visibility"
                                                                className="eye-icon"
                                                                onClick={() => setIsPasswordVisible(prev => !prev)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='error'>
                                                    {error}
                                                </div>
                                                <div className="button-registration-block">
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        formRegister();
                                                    }} className="button-registration">Зарегистрироваться</button>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
        
                    </div>
            </div>
        </div>

    );
    
};


export default Auth;