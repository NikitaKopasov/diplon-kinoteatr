import React from "react";
import NavBar from '../templates/header';
import "../assets/adminCSS/admin-main.scss"
import {SUBADMIN_ROUTE} from '../utils/consts';
import { useNavigate } from "react-router-dom"



const AdminMain = () => {
    
    const navigate = useNavigate();
    return(
        <div>
            <NavBar/>
            <div className="info-admin">
                <button>Добавить фильм</button><br/>
                <button onClick={() => {navigate(SUBADMIN_ROUTE)}}>Добавить подписку</button><br/>
            </div>
        </div>
    );
}
export default AdminMain;