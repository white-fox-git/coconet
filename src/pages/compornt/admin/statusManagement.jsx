import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const StatusManagement = () => {

    const [department, setDepartment] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [position, setPosition] = useState();
    const [selectPosition, setSelectPosition] = useState();
    const [userList, setUserList] = useState();
    const [selectUser, setSelectUser] = useState();
    const [status, setStatus] = useState();
    const [success, setSuccess] = useState(false);

    const getDepartment = () =>
    {
        axios.get('http://211.200.250.190:7070/coconet/user/department')
        .then((res) => {
            setDepartment(res.data);
        })
        .catch(() => {
            setDepartment(['개발팀', '디자인팀', '인사팀', '회계팀', '영업팀']);
        })
    }

    const searchPositon = (team) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/position?department=${team}`)
        .then((res) => {
            setPosition(res.data);
        })
        .catch(() => {
            setPosition(['부장', '사장', '사원']);
        });

        setSelectDepartment(team);
    }

    const searchUser = (position) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/username?department=${selectDepartment}&position=${position}`)
        .then((res) => {
            setUserList(res.data);
        })
        .catch(() => {
            setUserList(['김현빈', '김은비', '정재훈']);
        });

        setSelectPosition(position);
    }

    const getStatus = (user) => {
        setStatus(['근무', '외근', '출장', '휴가'])
        setSuccess(false);
        setSelectUser(user);
    }

    const sendStatus = (status) => {
        axios({
            url : "URL",
            method : "post",
            data : JSON.stringify({team : selectDepartment, position : selectPosition, user : selectUser, status : status}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            setSuccess(true);
        })
        .catch(() => {
            setSuccess(true);
            //alert('서버 전송에 실패하였습니다.')
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
                            <option value="" disabled selected>부서 선택</option>
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
                            <option value="" disabled selected>직급 선택</option>
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
                            <option value="" disabled selected>사원 선택</option>
                            {
                                userList != null ? userList.map((item, idx) => {
                                    return <option value={item} key={idx}>{item}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>근무 상태</h5>
                        <select className={style.selectBox} onChange={(e) => {sendStatus(e.target.value)}}>
                            <option value="" disabled selected>상태 선택</option>
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