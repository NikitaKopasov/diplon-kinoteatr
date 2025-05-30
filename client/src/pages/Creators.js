import React from "react";
import NavBar from '../templates/header';
import Footer from '../templates/footer';
import "../assets/css/creators.scss"
import UX from "../assets/images/uxUi.png"
import FRONT from "../assets/images/front.png"
import BACK from "../assets/images/back.png"
const Creators = () =>{

    return(
        <div className="creators-fon">
            <NavBar/>
                <div className="creators-container">
                    <p className="title">Команда создателей платформы</p>
                    <div className="team-creators">
                        <div className="creators">
                            <div className="img-name">
                                <img src={UX} className="uxUI-Front-Back"></img>
                                <p className="creators-name">Ловыгина Виктория</p>
                            </div>
                            <div className="title-text">
                                <p className="title-uxUI-Front-Back">Ux - Ui дизайнер</p>
                                <p className="text-uxUI-Front-Back">Разработала UI/UX дизайн для онлайн кинотеатра, используя Figma для создания удобного и привлекательного интерфейса. Она провела исследование пользователей, чтобы понять их потребности, и разработала интерактивные прототипы, которые были протестированы на целевой аудитории. В результате был создан интуитивно понятный интерфейс, который улучшил пользовательский опыт.</p>
                            </div>
                        </div>

                        <div className="creators">
                            <div className="img-name">
                                <img src={FRONT} className="uxUI-Front-Back"></img>
                                <p className="creators-name">Копасов Никита</p>
                            </div>
                            <div className="title-text">
                                <p className="title-uxUI-Front-Back">Frontend-разработчик</p>
                                <p className="text-uxUI-Front-Back">Разработала UI/UX дизайн для онлайн кинотеатра, используя Figma для создания удобного и привлекательного интерфейса. Она провела исследование пользователей, чтобы понять их потребности, и разработала интерактивные прототипы, которые были протестированы на целевой аудитории. В результате был создан интуитивно понятный интерфейс, который улучшил пользовательский опыт.</p>
                            </div>
                        </div>

                        <div className="creators">
                            <div className="img-name">
                                <img src={BACK} className="uxUI-Front-Back"></img>
                                <p className="creators-name">Савельев Константин</p>
                            </div>
                            <div className="title-text">
                                <p className="title-uxUI-Front-Back">Backend-разработчик</p>
                                <p className="text-uxUI-Front-Back">Разработала UI/UX дизайн для онлайн кинотеатра, используя Figma для создания удобного и привлекательного интерфейса. Она провела исследование пользователей, чтобы понять их потребности, и разработала интерактивные прототипы, которые были протестированы на целевой аудитории. В результате был создан интуитивно понятный интерфейс, который улучшил пользовательский опыт.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
        </div>
    );
};

export default Creators;