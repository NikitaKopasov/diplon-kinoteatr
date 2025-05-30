import {React, useState, useEffect} from 'react';
import NavBar from '../templates/header';
import { useParams } from 'react-router-dom';
import MultSlider from "../assets/script/ImageSliderMult"
import "../assets/css/category.scss"

const  CategoryPage = () => {

    const {category} = useParams()
    const isCartoon = category.toLowerCase() === 'мультфильмы';
    

    return (
        <div className='category-main'>
            <NavBar />
            <div className='title-category'>
                <h1>{category}</h1>
                {isCartoon && <MultSlider />}
            </div>
        </div>
    );
}

export default CategoryPage;