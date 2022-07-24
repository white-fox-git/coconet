import {React, useState} from "react";
import axios from "axios";
import style from "../../css/admin.module.css";

const UserLog = () => {

    const [department, setDepartment] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [position, setPosition] = useState();
    const [selctPosition, setSelectPosition] = useState();
    const [userList, setUserList] = useState();
    const [logInfo, setLogInfo] = useState();

    const getDepartment = () =>
    {
        axios.get('URL')
        .then((res) => {
            setDepartment(res.data);
        })
        .catch(() => {
            setDepartment(['개발팀', '디자인팀', '인사팀', '회계팀', '영업팀']);
        })
    }

    const searchPositon = (team) => {
        axios.post('URL', JSON.stringify({team : team}))
        .then((res) => {
            setPosition(res.data);
        })
        .catch(() => {
            setPosition(['부장', '사장', '사원']);
        });

        setSelectDepartment(team);
    }

    const searchUser = (position) => {
        axios.post('URL', {team : selectDepartment, position : position})
        .then((res) => {
            setUserList(res.data);
        })
        .catch(() => {
            setUserList(['김현빈', '김은비', '정재훈']);
        });

        setSelectPosition(position);
    }

    const getLog = (user) => {
        axios.post('URL', {team : selectDepartment, position : selctPosition, user : user})
        .then((res) => {
            setLogInfo(res.data);
        })
        .catch(() => {
            setLogInfo(
                [
                    {user : "김현빈", category : "출근 시간 설정", info:"2022-07-20 08:59 출근"},
                    {user : "김현빈", category : "출근 시간 설정", info:"2022-07-20 08:59 출근"},
                    {user : "김현빈", category : "출근 시간 설정", info:"2022-07-20 08:59 출근"},
                    {user : "김현빈", category : "출근 시간 설정", info:"2022-07-20 08:59 출근"},
                ]);
        })
    }

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>사용자 로그 조회</h2>
            <section className = {style.searchUser}>
                <h4 className={style.tableTitle}>조회할 사용자 선택</h4>
                <div className={style.userSelectBox}>
                    <div className={style.userSelect}>
                        <h5 className={style.searchUserTitle}>부서</h5>
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
                        <h5 className={style.searchUserTitle}>직급</h5>
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
                        <h5 className={style.searchUserTitle}>사원명</h5>
                        <select className={style.selectBox} onChange={(e) => {getLog(e.target.value)}}>
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
                </div>
            </section>
            <section className={style.tableBox}>
                <h4 className={style.tableTitle}>로그 확인</h4>
                <div className={style.logInfo}>
                    <div className={style.tableItem}>
                        <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>사용자</h4> 
                        <h4 className={style.tableTitleMini}>카테고리</h4>  
                        <h4 className={style.tableTitleMini}>내용</h4>                
                    </div>
                    {
                        logInfo != null ? logInfo.map((item, idx) => {
                            return(
                                <div className={style.tableItem} key={idx}>
                                    <span className={style.tableInfo}>{item.user}</span>
                                    <span className={style.tableInfo}>{item.category}</span>
                                    <span className={style.tableInfo}>{item.info}</span>
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