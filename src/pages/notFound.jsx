import React from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/notFound.module.css';

const NotFound = () =>
{

    const navigate = useNavigate();

    return(
        <>
            <div className={style.errorBox}>
                <h1 className = {style.title}>coconet</h1>
                <img className ={style.img} src = "/error.png"/>
                <h3 className = {style.message}>Page Not Found</h3>
                <p className = {style.message}>Sorry, the page could not be found. The link may be invalid. Click the button below or go to the main page.</p>
                <button onClick = {() => navigate(-1)} className={style.backBtn}>Go to previous or next page</button>
            </div>
        </>
    )
}

export default NotFound;

// 잘못된 경로로 접근했을 때 나타나는 페이지 버튼을 클릭하면 이전 페이지로 돌아감