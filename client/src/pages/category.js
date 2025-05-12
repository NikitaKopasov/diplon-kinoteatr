import {React, useState, useEffect} from 'react';
import NavBar from '../templates/header';
import { useParams } from 'react-router-dom';

const  CategoryPage = () => {

    const {category} = useParams()



    return(
        <div className='app'>
            <NavBar/>
            <h1>{category}</h1>
        </div>
    )
}

export default CategoryPage;