import {React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux/es/exports";
import { removeUser } from "../redux";
import axios from "axios";

const Main = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => {return state.user}); // user에 reudx안의 user state값을 가져옴
    let session = sessionStorage.getItem('user');

    useEffect(() => {

        if(user.name == null || user.session == null || user.auth == false || session == null) // redux의 id값이 없을 떄 main으로 접근할 경우
        {

            alert("Please Sign In!")
            navigate('/');
        }

        /*axios.post('URL', user.session)
        .then((response) => {
            console.log("session : " + response.data);
        })
        .catch(() => {
            console.log('session disconnected');
            alert("Please Sign In!")
            navigate('/');
        })*/

    }, []);

    return(
        <>
            <h1>{user.name} 접속 성공</h1>
            <button onClick = {() => {
                dispatch(removeUser());
                navigate('/');
            }}>Sign Out</button>
        </>
    )
}

export default Main;