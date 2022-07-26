import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { removeUser, refreshToken } from "../utils/redux";
import User from './compornt/user/user';
import Admin from './compornt/admin/admin';

const Main = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => {return state.user}); // user에 reudx안의 user state값을 가져옴
    const [admin, setAdmin] = useState(false);


    useEffect(() => {

        const token = sessionStorage.getItem('Refresh_Token');
        console.log(user);
        if(user == null ||user.name == null || user.authResult == false || token == null)
        {
            dispatch(removeUser());
            navigate('/');
        }
        else
        {
            dispatch(refreshToken(sessionStorage.getItem('Refresh_Token')));
        }

        if(user.name == "admin")
        {
            console.log("admin입니다");
            setAdmin(true);
        }
    }, []);

    return(
        <>
            {admin == true ? <Admin /> : null }
            {admin == false ? <User /> : null }
        </>
    )
}

export default Main;