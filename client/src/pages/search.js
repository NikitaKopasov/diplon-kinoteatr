import React from "react";
import "../assets/css/search.scss"
import NavBar from "../templates/header"
import Footer from "../templates/footer"
const Search = () => {
     
    return (

        <div className="fon-search">
            <NavBar/>
            <div className="search-container">
                <p className="title-search">Поиск</p>
                <div className="input-button-search">
                    <input type="text" className="input-search"></input>
                    <button className="btn-search">Искать</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default Search;