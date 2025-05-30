import "../assets/css/footer.scss"
import react from "react"
import TG from "../assets/images/tg.png"
import VK from "../assets/images/vk.png"
import RUTUBE from "../assets/images/RUTUBE.png"
import ROSGRAMM from "../assets/images/rossgram.png"
import {CREATORS_ROUTE} from '../utils/consts';
import { useNavigate } from "react-router-dom"
const Footer = () =>{

    const navigate = useNavigate();

    return(

        <div className="footer-info">
            <div>
                <p className="title-chapter">Разделы</p>
                <div className="chapter">Фильмы</div>
                <div className="chapter">О сервисе</div>
                <div className="chapter">Контакты</div>
            </div>
             <div className="title-footer">
                <p>Для вас</p>
                <div className="chapter">Личный кабинет</div>
                <div className="chapter">Поиск</div>
                <div className="chapter">Уведомления</div>
            </div>
             <div className="title-footer">
                <p >Служба поддержки</p>
                <div className="text-support">Мы всегда готовы вам помочь.Наши операторы онлайн 24/7</div>
            </div>
             <div className="title-footer-creators" onClick={() => {navigate(CREATORS_ROUTE)}}>
                <p>Создатели</p>
                <div className="chapter">Савельев Константин</div>
                <div className="chapter">Копасов Никита</div>
                <div className="chapter">Ловыгина Виктория</div>
            </div>
             <div className="title-footer">
                <p >Обратная связь</p>
                <div className="chapter">hgtcpvshc@gmail.com</div>
                <div className="chapter">kopasovnikita@gmail.com</div>
                <div className="icon-social">
                   <img src={TG} className="icon-tg"></img>
                   <img src={VK} className="icon-vk"></img>
                   <img src={RUTUBE} className="icon-rutube"></img>
                   <img src={ROSGRAMM} className="icon-rosgramm"></img>
                </div>
            </div>

        </div>
    );
};

export default Footer