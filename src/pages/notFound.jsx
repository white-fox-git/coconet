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
                <h1 className={style.error}>404 ERROR</h1>
                <hr className ={style.hr}/>
                <h3 className = {style.message}>Page Not Found</h3>
                <p className = {style.message}>Sorry, the page could not be found. The link may be invalid. Click the button below or go to the main page.</p>
                <button onClick = {() => navigate(-1)} className={style.backBtn}>Go to previous or next page</button>
            </div>
        </>
    )
}

export default NotFound;