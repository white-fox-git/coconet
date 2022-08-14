import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const AddUser = () => {

    const department = ['개발팀', '디자인팀', '회계팀', '영업팀', '인사팀']
    const position = ['사장', '부장', '과장', '대리', '사원']
    const [selectDepartment, setSelectDepartment] = useState();
    const [selectPosition, setSelectPosition] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [birthday, setBirthday] = useState();

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

    const submitUser = () => {
        if(selectDepartment != null && selectPosition != null && name != null && email != null && phone != null && birthday != null)
        {
            const data = JSON.stringify(
                {
                    name : name, // 이름
                    birthDate : birthday, // 생년월일
                    phone : phone,  // 전화번호
                    email : email,  // 이메일
                    department : selectDepartment, // 부서
                    position : selectPosition,  // 직급
                })
    
            axios({
                url : 'http://211.200.250.190:7070/coconet/signup',
                method : "post",
                data : data,
                responseType : 'json',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            .then(() => {
                alert('유저 등록 완료');
                setName(null);
                setEmail(null);
                setPhone(null);
                setBirthday(null);
                setSelectDepartment(null);
                setSelectPosition(null);
                document.querySelector("#option1").selected = true;
                document.querySelector("#option2").selected = true;
            })
            .catch(() => {
                alert('서버와의 연결에 실패했습니다.');
            })
        }
        else
        {
            alert('모든 정보를 입력해주세요');
        }
    }

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>신규 회원 추가</h2>
            <div className={style.tableBox}>
                <h4 className={style.tableTitle}>조직 정보</h4>
                <div className={style.userSelectBox}>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>부서</h5>
                        <select className={style.selectBox} onChange={(e) => {setSelectDepartment(e.target.value)}}>
                            <option id="option1" value="" disabled selected>부서 선택</option>
                                {
                                department != null ? department.map((item, idx) => {
                                    return <option value={item} key={idx}>{item}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>직급</h5>
                        <select className={style.selectBox} onChange={(e) => {setSelectPosition(e.target.value)}}> 
                            <option id="option2" value="" disabled selected>직급 선택</option>
                            {
                                position != null ? position.map((item, idx) => {
                                    return <option value={item} key={idx} >{item}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                </div>
                <h4 className={style.tableTitle}>기본 정보</h4>
                <div className={style.inputBox}>
                    <h5 className={style.selectTitle}>이름</h5>
                    <input value={name} type="text" className={style.input} placeholder="ex. 홍길동" onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className={style.inputBox}>
                    <h5 className={style.selectTitle}>이메일</h5>
                    <input value={email} type="email" className={style.input} placeholder="ex. coconet123@coconet.com" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className={style.inputBox}>
                    <h5 className={style.selectTitle}>전화번호</h5>
                    <input value={phone} type="text" className={style.input} placeholder="ex. 01012345678" minLength="11" maxLength="11" onChange={(e) => {setPhone(check(e.target.value))}}/>
                </div>
                <div className={style.inputBox}>
                    <h5 className={style.selectTitle}>생년월일</h5>
                    <input value={birthday} type="text" className={style.input} placeholder="ex. 20010101" minLength="8" maxLength="8" onChange={(e) => {setBirthday(check(e.target.value))}}/>
                </div>
                <button className={style.userSubmitBtn} onClick={() => {submitUser()}}>사용자 등록</button>
            </div>
        </div>
    )
}

export default AddUser;