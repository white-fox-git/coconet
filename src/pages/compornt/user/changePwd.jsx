/* eslint-disable */

import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/info.module.css"

const ChangePwd = (props) => {
    
    const [nowPwd, setNowPwd] = useState('');
    const [check, setCheck] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [checkPwd, setCheckPwd] = useState('');

    const nowPwdCheck = () => {
        axios({
            url : "http://211.200.250.190:7070/coconet/password/check",
            method : "post",
            data : JSON.stringify({name : props.user.name, phone : props.info.phone, password : nowPwd}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if(res.data == true)
            {
                setCheck(true);
                document.getElementById("newPwd").disabled = false;
                document.getElementById("checkPwd").disabled = false;
            }
            else
            {
                alert("비밀번호가 틀립니다.")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const changePassword = () => {


        if(newPwd != checkPwd || newPwd == '' && checkPwd == '')
        {
            alert('비밀번호가 서로 다릅니다.')
        }
        else
        {
            if(newPwd.length > 10)
            {
                axios({
                    url : "http://211.200.250.190:7070/coconet/password/change",
                    method : "post",
                    data : JSON.stringify({name : props.user.name, phone : props.info.phone, newPassword : newPwd}),
                    responseType : 'json',
                    headers : {
                        'Content-Type': 'application/json',
                    }
                })
                .then(() => {
                    alert("변경이 완료되었습니다.");
                    document.getElementById("newPwd").disabled = true;
                    document.getElementById("checkPwd").disabled = true;
                    setNowPwd('');
                    setNewPwd('');
                    setCheckPwd('');
                    setCheck(false);
                })
                .catch(() => {
                    alert("서버와의 연결에 실패하였습니다.")
                })
            }
            else
            {
                alert('비밀번호의 길이를 확인해주세요.');
            }
            
        }
    }

    return (
        <div className = {style.board}>
            <h5 className={style.title}>비밀번호 변경</h5>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>현재 비밀번호</p>
                <input type="password" maxLength="20" value={nowPwd} className={style.btnInput} onChange={(e) => {setNowPwd(e.target.value)}}/>
                <button className={style.inputBtn} onClick={() => {nowPwdCheck()}}>확인</button>
            </div>
            {
                check == true ? <p className={style.check}>* 확인 되었습니다.</p> : null
            }
            <div className={style.inputBox}>
                <p className={style.inputTitle}>새로운 비밀번호</p>
                <input type="password" id="newPwd" placeholder="영문 숫자 포함 8자 이상" value={newPwd} className={style.input} onChange={(e) => {setNewPwd(e.target.value)}} disabled/>
            </div>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>비밀번호 확인</p>
                <input type="password" id="checkPwd" value={checkPwd} className={style.input} onChange={(e) => {setCheckPwd(e.target.value)}} disabled/>
            </div>
            <button className={style.submitBtn} onClick={() => {changePassword()}}>변경</button>
        </div>
    )
}

export default ChangePwd;