import {React, useEffect, useState, useContext} from 'react';
import NavBar from '../templates/header';
import { getFilmsInSub } from '../http/subApi';
import { Context } from '..';

const MySub = () => {
    const {user} = useContext(Context)
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null)
    const [subs, setSubs] = useState([]);
    const [activeSub, setActiveSub] = useState({})

    useEffect(() => {
        getFilmsInSub(user.user.id).then((res) => {
            if(res && res.data) {
                setFilms(res.data)
            } else {
                setError('Неведомая ошибка')
            }
        }).catch((e) => {
            setError(e.response.data.message)
        });
    },[])

    console.log(films)

    return(
        <div className='mysub-main'>
            <NavBar/>
            <div>
                
            </div>
        </div>
    )
}

export default MySub;
