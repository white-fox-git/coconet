import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/info.module.css"

const ChangePwd = (props) => {
    
    const [nowPwd, setNowPwd] = useState('');
    const [check, setCheck] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [checkPwd, setCheckPwd] = useState('');

    const nowPwdCheck = () => {
        alert(JSON.stringify({user : props.user.name, email : props.info.email, pwd : nowPwd}));

        axios({
            url : "URL",
            method : "post",
            data : JSON.stringify({user : props.user.name, pwd : nowPwd}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            setCheck(true);
            document.getElementById("newPwd").disabled = false;
            document.getElementById("checkPwd").disabled = false;
        })
        .catch(() => {
            //alert("비밀번호가 틀립니다.")
            setCheck(true);
            document.getElementById("newPwd").disabled = false;
            document.getElementById("checkPwd").disabled = false;
        })
    }

    const changePassword = () => {
        if(newPwd != checkPwd && newPwd == '' && checkPwd == '')
        {
            alert('비밀번호가 서로 다릅니다.')
        }
        else
        {
            axios({
                url : "URL",
                method : "post",
                data : JSON.stringify({user : props.user.name, email : props.info.email, newPwd : newPwd}),
                responseType : 'json',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            .then(() => {
                alert("변경이 완료되었습니다.");
            })
            .catch(() => {
                alert("서버와의 연결에 실패하였습니다.")
            })
        }
    }

    return (
        <div className = {style.board}>
            <h5 className={style.title}>비밀번호 변경</h5>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>현재 비밀번호</p>
                <input type="password" maxLength="20" value={props.nowPwd} className={style.btnInput} onChange={(e) => {setNowPwd(e.target.value)}}/>
                <button className={style.inputBtn} onClick={() => {nowPwdCheck()}}>확인</button>
            </div>
            {
                check == true ? <p className={style.check}>* 확인 되었습니다.</p> : null
            }
            <div className={style.inputBox}>
                <p className={style.inputTitle}>새로운 비밀번호</p>
                <input type="password" id="newPwd" value={newPwd} className={style.input} onChange={(e) => {setNewPwd(e.target.value)}} disabled/>
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