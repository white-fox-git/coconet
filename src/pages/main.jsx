import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios";
import User from './compornt/user';
import Admin from './compornt/admin';

const Main = () => {

    let navigate = useNavigate();
    let user = useSelector((state) => {return state.user}); // user에 reudx안의 user state값을 가져옴
    let session = sessionStorage.getItem('user'); // session stroage의 세션 값 가져옴
    const [admin, setAdmin] = useState(false);

    useEffect(() => {

        if(user.name == null || user.session == null || user.auth == false || session == null) // redux의 값과 세션이 없을 떄 main으로 접근할 경우
        {

            alert("Please Sign In!")
            navigate('/'); // 로그인 페이지로 이동
        }

        if(user.name == admin)
        {
            setAdmin(true);
        }

        /*axios.post('URL', user.session)
        .then((response) => {
            console.log("session : " + response.data);
        })
        .catch(() => {
            console.log('session disconnected');
            alert("Please Sign In!")
            navigate('/');
        })*/ //세션 유지되고 있는지 확인 --> session stroage가 아니라 cookie를 써야 할 듯?

    }, []);

    return(
        <>
            {admin == false ? <User user = {user}/> : <Admin user = {user} />}
        </>
    )
}

export default Main;