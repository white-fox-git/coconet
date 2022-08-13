import {React, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { setUser } from '../../../utils/redux'
import axios from "axios";
import style from "../../../css/info.module.css"
import { useEffect } from "react";

const ModifyInfo = (props) => {

    const [name, setName] = useState(props.user.name);
    const [phone, setPhone] = useState();
    const [nameBtn, setNameBtn] = useState(false);
    const [phoneBtn, setPhoneBtn] = useState(false);

    const dispatch = useDispatch();

    const enableInput = (id) => {

        let item = document.getElementById(id)

        if(id == "name")
        {
            nameBtn == true ? setNameBtn(false) : setNameBtn(true);
        }
        else
        {
            phoneBtn == true ? setPhoneBtn(false) : setPhoneBtn(true);
        }

        if(item.disabled == true)
        {
           item.disabled = false;
           item.focus();
        }
        else
        {
            if(id == "name")
            {
                axios({
                    url : "http://211.200.250.190:7070/coconet/name/change",
                    method : "post",
                    data : JSON.stringify({name : name, num : props.user.userid}),
                    responseType : 'json',
                    headers : {
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => {
                    dispatch(setUser(res.data));
                })
                .catch((error) => {
                    console.log(error);
                    alert("업데이트 실패");
                })
    
                item.disabled = true;
            }
            else
            {
                axios({
                    
                    url : "http://211.200.250.190:7070/coconet/phone/change",
                    method : "post",
                    data : JSON.stringify({phone : phone, num : props.user.userid}),
                    responseType : 'json',
                    headers : {
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => {
                    props.getInfo();
                })
                .catch((error) => {
                    alert("업데이트 실패");
                    console.log(error);
                })
    
                item.disabled = true;
            }
        }
    }

    useEffect(() => {
        setPhone(props.info.phone);
    }, []);

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

    return (
        <div className = {style.board}>
            <h5 className={style.title}>기본 정보</h5>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>이름</p>
                <input type="text" value={name != null ? name : ''} id="name" className={style.btnInput} onChange={(e) => {setName(e.target.value)}} disabled/>
                {
                    nameBtn == false ?
                    <button className={style.inputBtn} onClick={() => {enableInput("name")}}>변경</button>
                    :
                    <button className={style.inputBtn} onClick={() => {enableInput("name")}}>저장</button>
                }
            </div>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>전화번호</p>
                <input type="text" value={phone} id="phone" className={style.btnInput} onChange={(e) => {setPhone(check(e.target.value))}} disabled/>
                {
                    phoneBtn == false ?
                    <button className={style.inputBtn} onClick={() => {enableInput("phone")}}>변경</button>
                    :
                    <button className={style.inputBtn} onClick={() => {enableInput("phone")}}>저장</button>
                }
            </div>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>이메일</p>
                <input type="text" value={props.info.email} className={style.input} disabled/>
            </div>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>생년월일</p>
                <input type="text" value={props.info.birthDate} className={style.input} disabled/>
            </div>
        </div>
    )
}

export default ModifyInfo;