import axios from "axios";
import {React, useState} from "react";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import style from '../css/findUser.module.css'

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
            <div className ={style.rootBox}>
            <div className ={style.findBox}>
                <div className={style.tap}>Reset Password</div>
            </div>
            <div className={style.infoBox}>
                {
                    info == false ? 
                        <UserInfo name = {name} setName = {setName} phone = {phone}  setPhone ={setPhone} setInfo = {setInfo} setCheckPhone ={setCheckPhone} setCheckCode = {setCheckCode}/> 
                    :
                        <SetPwd setCheckPwd = {setCheckPwd} name = {name} phone = {phone} /> 
                    }
            </div>
            <p className = {style.text}>You want Return to Sign In page <Link to = "/" className = {style.link}>Click here!</Link></p>
            </div>
            {
                checkPhone == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Please check the name or phone number you entered</p> : null  
            }
            {
                checkCode == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> Please check the code</p> : null  
            }
            {
                checkPwd == true ? <p className={style.Alert}><FontAwesomeIcon icon = {faTriangleExclamation} className={style.icon}></FontAwesomeIcon> The passwords are different or the input value is invalid.</p> : null  
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
        let resData;
    
        if(props.phone.length != 11 && props.name == '')
        {
            // phone 번호 또는 name입력이 잘못 되었을 때 Alert창 띄우기
            props.setCheckPhone(true) 
            setTimeout(() => {props.setCheckPhone(false)}, 3000);
        }
        else
        {
            axios.post('URL', JSON.stringify({name : props.name, phone : props.phone}))
            .then((res) => {
                resData = JSON.parse(res.data);
                if(resData.check == true)
                {
                    // check값이 true일 경우 redCode state에 서버가 보낸 code값을 넣고 비활성화 된 code Input을 활성화
                    setResCode(resData.code);
                    document.getElementById('code').disabled = false;
                    setMessage(true);
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
                    <h4 className={style.label}>Name</h4>
                    <input type ="text" className ={style.input} onChange = {(e) => props.setName(e.target.value)}/>
                </div>
                <div className={style.itemBox}>
                    <h5 className={style.label}>Phone Number</h5>
                    <input type ="text" className ={style.phoneNum} maxLength="11" placeholder="ex) 01012345678" value = {props.phone} onChange = {(e) => {
                            props.setPhone(check(e.target.value)); // check 함수를 거쳐 리턴된 값을 phone state에 저장
                        }}/>
                    <button className={style.getBtn} onClick={() => {getCode()}}>Get Code</button>
                    {
                        message == true ? <p className = {style.message}>Code has been sent.</p> : null
                    }
                </div>
                <div className={style.itemBox}>
                    <h4 className={style.label}>Code</h4>
                    <input id = "code" type ="text" disabled className ={style.input} placeholder="ex) 123456" maxLength="6" value = {code} onChange = {(e) => {
                        setCode(check(e.target.value)); // check 함수를 거쳐 리턴된 값을 code state에 저장
                        }}/> 
                </div>
                <button className={style.submitBtn} onClick = {() => {submitCode()}}>Submit</button>
        </>
    )
}

const SetPwd = (props) =>
{

    const [pwd, setPwd] = useState(''); // 변경할 암호
    const [pwd2, setPwd2] = useState(''); // 변경할 암호와 비교할 암호

    const submit = () =>
    {

        if(pwd == pwd2 && pwd.length > 10 && pwd != '') // 암호가 서로 갖고 10글자 이상에 null 값이 아닐경우
        {
            // 서버로 암호값을 json 파일 형식으로 변경하여 보냄

            axios.post('URL', JSON.stringify({name : props.name, phone : props.phone,  newPwd : pwd}))
            .then((res) => {
                console.log(res.data);
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
            console.log(false)
        }
    }

    return(
        <>
            <div className={style.itemBox}>
                <h4 className={style.label}>New Password</h4>
                <input type ="password" className ={style.input} onChange={(e) => setPwd(e.target.value)} maxLength="20"/>
            </div>
            <div className={style.itemBox}>
                <h4 className={style.label}>Check Password</h4>
                <input type ="password" className ={style.input} onChange={(e) => setPwd2(e.target.value)} maxLength="20"/>
            </div>
            <button className={style.submitBtn} onClick={() => submit()}>Submit</button>
        </>
    )
}

export default FindUser;