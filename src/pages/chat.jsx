import React from "react";
import style from '../css/chat.module.css';
import { useNavigate, useParams } from "react-router-dom";

const Chat = () =>
{
    let navigate = useNavigate();
    let {id} = useParams();
    console.log(id);

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
        </>
    )
}

export default Chat;