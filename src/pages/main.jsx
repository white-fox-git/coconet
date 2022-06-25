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
    let session = sessionStorage.getItem('user'); // session stroage의 세션 값 가져옴

    useEffect(() => {

        if(user.name == null || user.session == null || user.auth == false || session == null) // redux의 값과 세션이 없을 떄 main으로 접근할 경우
        {

            alert("Please Sign In!")
            navigate('/'); // 로그인 페이지로 이동
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
            <h1>{user.name} 접속 성공</h1>
            <button onClick = {() => {
                dispatch(removeUser()); // 버튼 클릭하면 세션과 redux에 있는 user state 초기화
                navigate('/'); // 로그인 페이지로 이동함
            }}>Sign Out</button>
        </>
    )
}

export default Main;