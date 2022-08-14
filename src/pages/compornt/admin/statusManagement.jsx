import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";
import { setUser } from "../../../utils/redux";

const StatusManagement = () => {

    const [department, setDepartment] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [position, setPosition] = useState();
    const [selectPosition, setSelectPosition] = useState();
    const [userList, setUserList] = useState();
    const [selectUser, setSelectUser] = useState();
    const [status, setStatus] = useState();
    const [success, setSuccess] = useState(false);
    const [userid, setUserid] = useState();
    

    const getDepartment = () =>
    {
        axios.get('http://211.200.250.190:7070/coconet/user/department')
        .then((res) => {
            setDepartment(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        setSuccess(false);
    }

    const searchPositon = (team) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/position?department=${team}`)
        .then((res) => {
            setPosition(res.data);
        })
        .catch((error) => {
            setPosition(['유저 없음']);
        });
        setSelectDepartment(team);
        setSuccess(false);
    }

    const searchUser = (position) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/username?department=${selectDepartment}&position=${position}`)
        .then((res) => {
            setUserList(res.data);
        })
        .catch(() => {
            setUserList(['유저 없음']);
        });
        setSelectPosition(position);
        setSuccess(false);
    }

    const getStatus = (user) => {
        setStatus(['근무', '외근', '출장', '휴가']);
        setUserid(user);
        setSuccess(false);
    }

    const sendStatus = (status) => {

        if(status == '근무')
        {
            status = undefined;
        }
        else if(status == '외근')
        {
            status = 11;
        }
        else if(status == '출장')
        {
            status = 13;
        }
        else if(status == '휴가')
        {
            status = 14;
        }


        axios({
            url : "http://211.200.250.190:7070/coconet/status",
            method : "post",
            data : JSON.stringify({num : userid, status : status}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            setSuccess(true);
            setDepartment(null);
            setPosition(null);
            setUserList(null);
            document.getElementById("option1").selected = true;
            document.getElementById("option2").selected = true;
            document.getElementById("option3").selected = true;
            document.getElementById("option4").selected = true;
        })
        .catch(() => {
            console.log(error);
            alert('서버 전송에 실패하였습니다.')
        })
    }

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>근무 상태 관리</h2>
            <section className = {style.searchUser}>
                <h4 className={style.tableTitle}>관리할 사용자</h4>
                <div className={style.userSelectBox}>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>부서</h5>
                        <select className={style.selectBox} value={selectDepartment} onClick={() => {getDepartment()}} onChange={(e) => {searchPositon(e.target.value)}}>
                            <option value="" id="option1" disabled selected>부서 선택</option>
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
                        <select className={style.selectBox} onChange={(e) => {searchUser(e.target.value)}}> 
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
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>사원명</h5>
                        <select className={style.selectBox} onChange={(e) => {getStatus(e.target.value)}}>
                            <option value="" id="option3" disabled selected>사원 선택</option>
                            {
                                userList != null ? userList.map((item, idx) => {
                                    return <option value={item.userid} key={idx}>{item.name}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>근무 상태</h5>
                        <select className={style.selectBox} onChange={(e) => {sendStatus(e.target.value)}}>
                            <option value="" id="option4" disabled selected>상태 선택</option>
                            {
                                status != null ? status.map((item, idx) => {
                                    return <option value={item} key={idx}>{item}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                    {
                        success == true ? <p className={style.success}>* 변경이 완료되었습니다.</p> : null
                    }
                </div>
            </section> 
        </div>
    )
}

export default StatusManagement;