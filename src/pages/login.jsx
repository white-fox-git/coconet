import {React, useEffect, useState} from "react";
import style from '../css/login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faLock, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setUser } from '../redux'
import axios from 'axios';

const Login = () => {

    const [id, setId] = useState(''); // id 값
    const [pwd, setPwd] = useState(''); // pwd 값
    const [idAlert, setIdAlert] = useState(false); // id 잘못 입력했을 때 
    const [pwdAlert, setPwdAlert] = useState(false); // pwd 잘못 입력했을 때

    const navigate = useNavigate(); // 페이지 이동 함수
    const dispatch = useDispatch(); // redux에 있는 state의 함수 실행을 위한 함수

    let session = sessionStorage.getItem('user');
    let user = useSelector((state) => {return state.user});

    useEffect(() => {
        if(user.name != '' && user.session != null && user.auth != false && session != null)
        {
            navigate('/main')
        }
    }, [])


    const login = () =>
    {
        if(id == '')
        {
            setIdAlert(true)
            setTimeout(() => {setIdAlert(false)}, 2000);
        }
        else if(pwd == '')
        {
            setPwdAlert(true)
            setTimeout(() => {setPwdAlert(false)}, 2000);
        }
        else
        {
            let request; // post 요청의 결과 값

            axios.post('URL', JSON.stringify({id : id, pwd : pwd}))
            .then((response) => {
                request = JSON.parse(response.data);
            })
            .catch((error) => {
                console.log(error)
            });

            console.log("data : " + request);

            if(request/*.auth*/ == true)
            {
                dispatch(setUser(request)); // redux state의 user 값 세팅
                navigate('/main'); // main 페이지로 이동
            }
            else
            {
                setPwdAlert(true)
                setTimeout(() => {setPwdAlert(false)}, 2000);
                console.log("login failed");
            }    
        }
        
    }

    return(
        <>
            <header className={style.header}>
                <h2 className={style.title}>coconet</h2>
            </header>
            <div className ={style.loginBox}>
                <div className={style.inputBox}>
                    <FontAwesomeIcon className={style.label} icon ={faUser}></FontAwesomeIcon>
                    <input type ="text" className={style.input} placeholder="user" maxLength={20} autoComplete = "off" onChange={(e) => {
                        setId(e.target.value);
                        setIdAlert(false);
                    }}/>
                </div>
                <div className={style.inputBox}>
                    <FontAwesomeIcon className={style.label} icon = {faLock}></FontAwesomeIcon>
                    <input type ="password" className={style.input} placeholder="password" maxLength={20} autoComplete = "off" onChange={(e) => {
                        setPwd(e.target.value);
                        setPwdAlert(false);
                        }}/>
                </div>
                <button className={style.loginBtn} onClick={() => login()}>Sign In</button>
            </div>
            <hr className={style.hr}/>
            <div className ={style.linkBox}>
                <Link to ="/findUser" className = {style.link}>Forgot your password?</Link>
            </div>
            {
                idAlert == true ?
                <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Check your name.</p>
                :
                null
            }
            {
                pwdAlert == true ?
                <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Check your password.</p>
                :
                null
            }
        </>
    )
}

export default Login;