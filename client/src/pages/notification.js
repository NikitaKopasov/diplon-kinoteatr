import react from "react";
import NavBar from '../templates/header';
import Footer from '../templates/footer';
import "../assets/css/notification.scss"

const Notification = () => {

    return (
        <div className="fon-notification">
            <NavBar/>
            <div className="notification-container">
                <div className="title-notification">
                    <h1>Уведомления</h1>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Notification;