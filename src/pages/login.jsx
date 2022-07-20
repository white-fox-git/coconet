import {React, useEffect, useState} from "react";
import style from '../css/login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setUser } from '../redux'
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState(''); // id 값
    const [pwd, setPwd] = useState(''); // pwd 값
    const [idAlert, setIdAlert] = useState(false); // id 잘못 입력했을 때 
    const [pwdAlert, setPwdAlert] = useState(false); // pwd 잘못 입력했을 때


    const navigate = useNavigate(); // 페이지 이동 함수
    const dispatch = useDispatch(); // redux에 있는 state의 함수 실행을 위한 함수

    let user = useSelector((state) => {return state.user}); // redux.jsx에 있는 user state의 값을 가져옴

    useEffect(() => {
        if(user.name != ''  && user.auth != false)
        {
            navigate('/main');
        }
    }, []);

    const Enter = (e) => {
        if(e == 'Enter')
        {
            login();
        }
    }

    const login = () =>
    {
        if(email == '' || email == ' ')
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
            let json = JSON.stringify({email : email, password : pwd});
            console.log(json);

            axios({
                url : 'http://211.200.250.190:7070/coconet/login',
                method : "post",
                data : json,
                responseType : 'json',
                headers : {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            })
            .then((res) => {
                dispatch(setUser(res.data));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.headers.jwt_access_token;
                localStorage.setItem('TOKEN', res.headers.jwt_refresh_token);
                navigate('/main');
            })
            .catch((error) => {
                console.log(error);
                setPwdAlert(true)
                setTimeout(() => {setPwdAlert(false)}, 2000); // pwd값이 없을 때 2초동안 alert창
            })
        }
    }

    return(
        <>
            <div className={style.item}>
                    <header className={style.header}>
                        <h4 className={style.headerTitle}>로그인</h4>
                        <p className={style.headerText}>회사에서 사용하는 이메일을 사용하여 로그인하세요.</p>
                    </header>
                    <div className ={style.loginBox}>
                        <div className={style.inputBox}>
                            <p className = {style.label}>Email</p>
                            <input type ="email" className={style.input}  maxLength={25} autoComplete = "off" 
                            onKeyPress={(e) => Enter(e.key) /*커서가 input위에 올라가 있는 상태에서 Enter Key클릭시 Login 이벤트 발생 */}
                            onChange={(e) => {
                                setEmail(e.target.value); // input에 작성되는 글자를 id state에 저장
                                setIdAlert(false); // input에 글자가 써지기 시작하면 alert를 없앤다
                            }}/>
                        </div>
                        <div className={style.inputBox}>
                        <p className = {style.label}>Password</p>
                            <input type ="password" className={style.input} maxLength={20} autoComplete = "off" 
                            onKeyPress={(e) => Enter(e.key)}
                            onChange={(e) => {
                                setPwd(e.target.value);
                                setPwdAlert(false);
                                }}/>
                        </div>
                        <div className ={style.linkBox}>
                        <Link to ="/findUser" className = {style.link}><span className={style.pointText}>비밀번호</span>를 잊으셨나요?</Link>
                    </div>
                        <button className={style.loginBtn} onClick={() => login()}>로그인</button>
                    </div>
                    {
                        idAlert == true ? // idAlert 값이 true가 되면 경고창을 띄움
                        <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon>이메일을 확인해주세요.</p>
                        :
                        null
                    }
                    {
                        pwdAlert == true ? // pwdAlert 값이 true가 되면 경고창을 띄움
                        <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon>비밀번호를 확인해주세요.</p>
                        :
                        null
                    }
                </div>
            <div className={style.bg} />
        </>
    )
}

export default Login;