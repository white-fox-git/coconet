import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { removeUser } from "../redux";
import User from './compornt/user';
import Admin from './compornt/admin';

const Main = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => {return state.user}); // user에 reudx안의 user state값을 가져옴
    const [admin, setAdmin] = useState(false);

    useEffect(() => {

        if(user.name == '' && user.auth == false)
        {
            dispatch(removeUser());
            navigate('/');
        }

        if(user.name == "admin")
        {
            setAdmin(true);
        }

    }, []);

    return(
        <>
            {admin == false ? <User user = {user}/> : <Admin user = {user} />}
        </>
    )
}

export default Main;