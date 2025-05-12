import {React} from 'react';
import "../assets/css/Error404.scss"
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';
const Miskate = () => {
    const navigate = useNavigate()
    return (
        <div className="Error-fon">
            <button onClick={()=> {
                navigate(MAIN_ROUTE)
            }} className="back-button">Назад</button>
                <div className="info-error">
                    <div className="text-error">
                        <p>Упс...</p>
                        <p>Ошибка</p>
                    </div>
                    <div className="code-error">
                        <p>4</p>
                        <p className="number-error">0</p>
                        <p>4</p>
                    </div>
                </div>
        </div>
    );
};
  
export default Miskate;