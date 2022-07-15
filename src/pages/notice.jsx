import React from "react";
import style from '../css/notice.module.css';
import { useNavigate } from "react-router-dom";

const Notice = () =>
{
    let navigate = useNavigate();

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
        </>
    )
}

export default Notice;