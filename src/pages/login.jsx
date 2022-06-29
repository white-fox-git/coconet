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

    let session = sessionStorage.getItem('user'); // session Stroage의 세션 값
    let user = useSelector((state) => {return state.user}); // redux.jsx에 있는 user state의 값을 가져옴

    useEffect(() => {
        if(user.name != '' && user.session != null && user.auth != false && session != null) // 만약 redux의 유저 정보와 세션이 존재할경우 메인페이지로
        {
            navigate('/main')
        }
    }, [])

    const Enter = (e) => {
        if(e == 'Enter')
        {
            login();
        }
    }

    const login = () =>
    {
        if(id == '' || id == ' ')
        {
            setIdAlert(true)
            setTimeout(() => {setIdAlert(false)}, 2000); // id값이 없을 때 2초동안 alert창
        }
        else if(pwd == '')
        {
            setPwdAlert(true)
            setTimeout(() => {setPwdAlert(false)}, 2000); // pwd값이 없을 때 2초동안 alert창
        }
        else
        {
            let resData; // post 요청의 결과 값

            axios.post('URL', JSON.stringify({id : id, pwd : pwd})) // obj 형식을 json파일로 변환하여 url경로에 post 요청
            .then((response) => {
                request = JSON.parse(response.data); // json으로 받아온 파일을 obj 형식으로 변환하여 변수에 저장
            })
            .catch((error) => {
                console.log(error) // error 처리
            });

            console.log("data : " + resData);

            if(resData/*.auth*/ == true) // requset.auth의 값이 true 경우 메인 페이지로 이동하고 redux의 user state에 값 설정
            {
                dispatch(setUser(resData)); // redux state의 user 값 세팅
                navigate('/main'); // main 페이지로 이동
            }
            else // true가 아닐경우엔 pwd alert 창을 띄우고 로그인 실패 로그
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
                    <input type ="text" className={style.input} placeholder="user" maxLength={20} autoComplete = "off" 
                    onKeyPress={(e) => Enter(e.key) /*커서가 input위에 올라가 있는 상태에서 Enter Key클릭시 Login 이벤트 발생 */}
                    onChange={(e) => {
                        setId(e.target.value); // input에 작성되는 글자를 id state에 저장
                        setIdAlert(false); // input에 글자가 써지기 시작하면 alert를 없앤다
                    }}/>
                </div>
                <div className={style.inputBox}>
                    <FontAwesomeIcon className={style.label} icon = {faLock}></FontAwesomeIcon>
                    <input type ="password" className={style.input} placeholder="password" maxLength={20} autoComplete = "off" 
                    onKeyPress={(e) => Enter(e.key)}
                    onChange={(e) => {
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
                idAlert == true ? // idAlert 값이 true가 되면 경고창을 띄움
                <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Check your User name.</p>
                :
                null
            }
            {
                pwdAlert == true ? // pwdAlert 값이 true가 되면 경고창을 띄움
                <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Check your password.</p>
                :
                null
            }
        </>
    )
}

export default Login;