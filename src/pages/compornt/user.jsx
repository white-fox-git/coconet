import {React, useState} from "react";
import { removeUser } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faComment } from "@fortawesome/free-solid-svg-icons";
import { PieChart } from "react-minimal-pie-chart";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import style from "../../css/main.module.css";
import axios from "axios";

const User = (props) =>
{
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => { return state.user } )

    const [ul, setUl] = useState(false);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date =  today.getDate();

    let data;


    return(
        <>
           <div className={style.content}>
            <div className={style.helloBox}>
                    <img className={style.userImg} src="/logo.png"/>
                    <div className={style.hello}>
                        <p className={style.helloText}>{user.name}님 환영합니다</p>
                    </div>
                    <div className={style.todayBox}>
                        <h3 className={style.title}>오늘의 업무</h3>
                        <section className={style.today}>
                            
                        </section>
                    </div>
            </div>
            <div className={style.dashboard}>
                <div className={style.boardTitle}>
                    <h4>대시보드</h4>
                </div>
                <section>
                </section>
            </div>
            <div className={style.chatBtnBox}>
                {
                    ul == true ?
                    <ul className={style.ul}>
                        <li className={style.li}><Link to ="" className={style.liLink}><FontAwesomeIcon icon ={ faComment } className={style.liIcon}/> 채팅</Link></li>
                        <li className={style.li}><Link to ="" className={style.liLink} onClick={() => {
                            console.log('sign out');
                            navigate('/');
                            dispatch(removeUser());
                        }}><FontAwesomeIcon icon ={ faRightFromBracket } className={style.liIcon}/> 로그아웃</Link></li>
                    </ul>
                    :
                    null
                }
                <button className={style.chatBtn} onClick={() => {ul == true ? setUl(false) : setUl(true)}}><FontAwesomeIcon icon ={ faUser }/></button>
            </div>
           </div>
        </>
    )
}

export default User;