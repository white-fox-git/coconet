import axios from "axios";
import {React, useState} from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import style from '../css/findUser.module.css'

axios.defaults.timeout = 3000;

const FindUser = () =>
{

    const [info, setInfo] = useState(false); // true가 될시 비밀번호 변경이 가능한 페이지로 넘어감
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Alert 창 state
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkCode, setCheckCode] = useState(false);
    const [checkPwd, setCheckPwd] = useState(false);

    return(
        <>
            <div className={style.bg}/>
            <div className ={style.rootBox}>
            <div className ={style.findBox}>
                <div className={style.tap}>비밀번호 초기화</div>
            </div>
            <div className={style.infoBox}>
                {
                    info == false ? 
                        <UserInfo name = {name} setName = {setName} phone = {phone}  setPhone ={setPhone} setInfo = {setInfo} setCheckPhone ={setCheckPhone} setCheckCode = {setCheckCode}/> 
                    :
                        <SetPwd setCheckPwd = {setCheckPwd} name = {name} phone = {phone} /> 
                    }
            </div>
            <p className = {style.text}>로그인 페이지로 돌아가려면<Link to = "/" className = {style.link}> 이곳</Link>을 클릭해주세요</p>
            </div>
            {
                checkPhone == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon>이름 또는 전화번호를 확인해주세요.</p> : null  
            }
            {
                checkCode == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon>코드가 틀립니다. 다시 입력해주세요.</p> : null  
            }
            {
                checkPwd == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon>비밀번호가 서로 다르거나 입력값이 잘못 되었습니다.</p> : null  
            }
        </>
        
    )
}

const UserInfo = (props) =>
{
    const [resCode, setResCode] = useState(''); // 서버에서 받은 코드
    const [code, setCode] = useState(''); // 사용자가 입력할 코드
    const [message, setMessage] = useState(false); // 코드 전송 메세지

    const getCode = () =>
    {
        if(props.phone.length != 11 && props.name == '')
        {
            // phone 번호 또는 name입력이 잘못 되었을 때 Alert창 띄우기
            props.setCheckPhone(true) 
            setTimeout(() => {props.setCheckPhone(false)}, 3000);
        }
        else
        {
            axios.get(`http://211.200.250.190:7070/coconet/sendSMS?name=${props.name}&phone=${props.phone}`)
            .then((res) => {
                let data = res.data;
                if(data.issuedCode == true)
                {
                    // check값이 true일 경우 redCode state에 서버가 보낸 code값을 넣고 비활성화 된 code Input을 활성화
                    document.getElementById('code').disabled = false;
                    setMessage(true);
                    setResCode(data.authCode);
                }
                else
                {
                    // check값이 false일 경우 입력값을 확인하라는 경고창
                    props.setCheckPhone(true) 
                    setTimeout(() => {props.setCheckPhone(false)}, 3000);
                }
            }).catch((error) => {
                console.log(error);
                props.setCheckPhone(true) 
                setTimeout(() => {props.setCheckPhone(false)}, 3000);
            });
        }
    }

    const submitCode = () =>
    {
        if(code == resCode && code != '')
        {
            // 코드가 같고 Null 값이 아닐경우에 비밀번호 변경 창을 보여줌
            props.setInfo(true);
        }
        else
        {
            // 아니라면 code 관련 Alert 창을 띄운다
            props.setCheckCode(true);
            setTimeout(() => {props.setCheckCode(false)}, 3000);
        }
    }

    const check = (e) =>
    {
        // 입력된 값이 숫자가 아닐경우에는 입력 받지 않고 state를 초기화 함
        if(isNaN(e) == false)
        {
            return e;
        }
        else
        {
            return ''
        }
    }

    return(
        <>
                <div className={style.itemBox}>
                    <p className={style.label}>이름</p>
                    <input type ="text" className ={style.input} onChange = {(e) => props.setName(e.target.value)}/>
                </div>
                <div className={style.itemBox}>
                    <p className={style.label}>전화번호</p>
                    <input type ="text" className ={style.phoneNum} maxLength="11" placeholder="ex) 01012345678" value = {props.phone} onChange = {(e) => {
                            props.setPhone(check(e.target.value)); // check 함수를 거쳐 리턴된 값을 phone state에 저장
                        }}/>
                    <button className={style.getBtn} onClick={() => {getCode()}}>코드 얻기</button>
                    {
                        message == true ? <p className = {style.message}>코드가 전송되었습니다.</p> : null
                    }
                </div>
                <div className={style.itemBox}>
                    <p className={style.label}>코드</p>
                    <input id = "code" type ="text" disabled className ={style.input} placeholder="ex) 1234" maxLength="4" value = {code} onChange = {(e) => {
                        setCode(check(e.target.value)); // check 함수를 거쳐 리턴된 값을 code state에 저장
                        }}/> 
                </div>
                <div className={style.textBox}>
                    <p className={style.checkText}>문자로 발송된 <font className={style.pointText}>인증번호(4자리)</font>를 입력해주세요.</p>
                    <p className={style.checkText}>입력하신 정보가 <font className={style.pointText}>일치하지 않을 경우</font> 인증문자가 발송되지 않습니다.</p>
                </div>
                <button className={style.submitBtn} onClick = {() => {submitCode()}}>인증하기</button>
        </>
    )
}

const SetPwd = (props) =>
{

    let navigate = useNavigate();

    const [pwd, setPwd] = useState(''); // 변경할 암호
    const [pwd2, setPwd2] = useState(''); // 변경할 암호와 비교할 암호

    const submit = () =>
    {

        if(pwd == pwd2 && pwd.length > 10 && pwd != '') // 암호가 서로 갖고 10글자 이상에 null 값이 아닐경우
        {
            // 서버로 암호값을 json 파일 형식으로 변경하여 보냄


            axios({
                url : 'http://211.200.250.190:7070/coconet/password/change',
                method : "post",
                data : JSON.stringify({name : props.name, phone : props.phone,  newPassword : pwd}),
                responseType : 'json',
                headers : {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            })
            .then(() => {
                alert("변경완료");
                navigate('/');
            })
            .catch((error) =>{
                console.log(error);
            })
        }
        else
        {
            // 암호에 문제가 있다면 pwd Alert창을 띄움
            props.setCheckPwd(true);
            setTimeout(() => {props.setCheckPwd(false)}, 2000);
        }
    }

    return(
        <div className={style.changePassword}>
            <div className={style.itemBox}>
                <p className={style.label}>새로운 비밀번호</p>
                <input type ="password" className ={style.input} onChange={(e) => setPwd(e.target.value)} maxLength="20"/>
            </div>
            <div className={style.itemBox}>
                <p className={style.label}>비밀번호 확인</p>
                <input type ="password" className ={style.input} onChange={(e) => setPwd2(e.target.value)} maxLength="20"/>
            </div>
            <button className={style.submitBtn} onClick={() => submit()}>변경</button>
        </div>
    )
}

export default FindUser;