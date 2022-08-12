import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const UserLog = () => {

    const [department, setDepartment] = useState(); // 부서 정보
    const [selectDepartment, setSelectDepartment] = useState(); // 어떤 부서가 선택되었는가?
    const [position, setPosition] = useState(); // 직급 정보
    const [selectPosition, setSelectPosition] = useState(); // 어떤 직급이 선택되었는가?
    const [userList, setUserList] = useState(); // 유저 정보
    const [logInfo, setLogInfo] = useState([]); // 유저의 로그 정보

    const getDepartment = () =>
    {
        axios.get('http://211.200.250.190:7070/coconet/user/department')
        .then((res) => {
            setDepartment(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const searchPositon = (team) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/position?department=${team}`)
        .then((res) => {
            setPosition(res.data);
        })
        .catch(() => {
            console.log(error);
        });

        setSelectDepartment(team);
    }

    const searchUser = (position) => {
        axios.get(`http://211.200.250.190:7070/coconet/user/username?department=${selectDepartment}&position=${position}`)
        .then((res) => {
            setUserList(res.data);
        })
        .catch((error) => {
            console.log(error);
        });

        setSelectPosition(position);
    }

    const getLog = (user) => {
        
        console.log(user);

        axios.get(`http://211.200.250.190:7070/coconet/logs/user?department=${selectDepartment}&position=${selectPosition}&username=${user}`)
        .then((res) => {
            setLogInfo(res.data);
            setDepartment(null);
            setPosition(null);
            setUserList(null);
            document.getElementById("option1").selected = true;
            document.getElementById("option2").selected = true;
            document.getElementById("option3").selected = true;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>사용자 로그 조회</h2>
            <section className = {style.searchUser}>
                <h4 className={style.tableTitle}>조회할 사용자 선택</h4>
                <div className={style.userSelectBox}>
                    <div className={style.userSelect}>
                        <h5 className={style.selectTitle}>부서</h5>
                        <select className={style.selectBox} value={selectDepartment} onClick={() => {getDepartment()}} onChange={(e) => {searchPositon(e.target.value)}}>
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
                        <select className={style.selectBox} onChange={(e) => {getLog(e.target.value)}}>
                            <option id="option3" value="" disabled selected>사원 선택</option>
                            {
                                userList != null ? userList.map((item, idx) => {
                                    return <option value={item.name} key={idx}>{item.name}</option>
                                })
                                :
                                null
                            }
                        </select>
                    </div>
                </div>
            </section>
            <section className={style.tableBox}>
                <h4 className={style.tableTitle}>로그 확인</h4>
                <div className={style.logInfo}>
                    <div className={style.tableItem}>
                        <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>사용자</h4>
                        <h4 className={style.tableTitleMini}>태그</h4> 
                        <h4 className={style.tableTitleMini}>카테고리</h4>  
                        <h4 className={style.tableTitleMini}>시간</h4>                
                    </div>
                    {
                        logInfo != null ? logInfo.map((item, idx) => {
                            return(
                                <div className={style.tableItem} key={idx}>
                                    <span className={style.tableInfo}>{item.name}</span>
                                    <span className={style.tableInfo}>{item.tag}</span>
                                    <span className={style.tableInfo}>{item.title}</span>
                                    <span className={style.tableInfo}>{item.date}</span>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
            </section>
        </div>
    )
}

export default UserLog;