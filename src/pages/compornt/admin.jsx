import {React, useState} from "react";
import { removeUser } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import style from "../../css/main.module.css";

const Admin = () =>
{
    const [bar, setBar] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    return(
        <>
            <header className = {style.header}>
                <img src = "/logo_text.png" className ={style.logo} onClick={() => navigate('/main')} />
                <ul className ={style.desktopUl}>
                    <li className={style.desktopLi}>Manage Users</li>
                    <li className={style.desktopLi}>Device Management</li>
                    <li className={style.desktopLi}>Board</li>
                    <li className={style.desktopLi}>Chat</li>
                    <FontAwesomeIcon icon = {faRightFromBracket } className ={style.signOut} onClick = {() => {
                        dispatch(removeUser()); // 버튼 클릭하면 세션과 redux에 있는 user state 초기화
                        navigate('/'); // 로그인 페이지로 이동함
                    }}/>
                </ul>
                <FontAwesomeIcon icon = {faBars} className={style.barBtn} onClick={() => {bar == true ? setBar(false) : setBar(true)}}/>
            </header>
            <ul className ={bar == true ? style.mobileUl : style.hiddenUl}>
                <li className={style.mobileLi}>Manage Users</li>
                <li className={style.mobileLi}>Device Management</li>
                <li className={style.mobileLi}>Board</li>
                <li className={style.mobileLi}>Chat</li>
                <FontAwesomeIcon icon = {faRightFromBracket } className ={style.signOut} onClick = {() => {
                    dispatch(removeUser()); // 버튼 클릭하면 세션과 redux에 있는 user state 초기화
                    navigate('/'); // 로그인 페이지로 이동함
                }}/>
            </ul>
        </>
    )
}

export default Admin;