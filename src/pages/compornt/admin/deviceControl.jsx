import {React, useState} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const DeviceControl = () => {

    const [department, setDepartment] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [selectPosition, setSelectPosition] = useState();
    const [position, setPosition] = useState();
    const [userList, setUserList] = useState();
    const [user, setUser] = useState();
    const [deviceInfo, setDeviceInfo] = useState();

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
            console.log(res.data);
            setUserList(res.data);
        })
        .catch((error) => {
            console.log(error);
        });

        setSelectPosition(position);
    }

    const getDevice = (user) => {

        setUser(user);

        axios.get(`URL?department=${selectDepartment}&position=${selectPosition}&user=${user}`)
        .then((res) => {
            setDeviceInfo(res.data);
            setDepartment(null);
            setPosition(null);
            document.getElementById("option1").selected = true;
            document.getElementById("option2").selected = true;
            document.getElementById("option3").selected = true;
        })
        .catch(() => {
            setDeviceInfo(
                [
                    {device : "Galuxy Note 10", camera : true, mike : false, record : true, screenShot : true},
                    {device : "Galuxy S22 Plus", camera : true, mike : true, record : false, screenShot : true}
                ]
            );
            setDepartment(null);
            setPosition(null);
            document.getElementById("option1").selected = true;
            document.getElementById("option2").selected = true;
            document.getElementById("option3").selected = true;
        });
    }

    const changeState = (state, idx, item) => {
        let copy = [...deviceInfo];
        let itemName;
        const control = state == true ? false : true;

        if(item == 1)
        {
            itemName = "camera";
            if(state == true)
                copy[idx].camera = false;
            else
                copy[idx].camera = true;
        }
        else if(item == 2)
        {
            itemName = "mike";
            if(state == true)
                copy[idx].mike = false;
            else
                copy[idx].mike = true;
        }
        else if(item == 3)
        {
            itemName = "record";
            if(state == true)
                copy[idx].record = false;
            else
                copy[idx].record = true;
        }
        else
        {
            itemName = "screenShot";
            if(state == true)
                copy[idx].screenShot = false;
            else
                copy[idx].screenShot = true;
        }
        
        setDeviceInfo(copy);
    }

    const submitItem = (idx) => {
        let copy = [...deviceInfo];
        let addUser = { user : user };
        const result = Object.assign(addUser, copy[idx]);
        console.log(JSON.stringify(result));
    }

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>디바이스 관리</h2>
            <section className = {style.searchUser}>
                <h4 className={style.tableTitle}>관리할 사용자</h4>
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
                        <select className={style.selectBox} onChange={(e) => {getDevice(e.target.value)}}>
                            <option id="option3" value="" disabled selected>사원 선택</option>
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
                <div className={style.tableBox}>
                <h4 className={style.tableTitle}>사용하는 디바이스 목록</h4>
                    <div className={style.logInfo}>
                        <div className={style.tableItem}>
                            <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>디바이스</h4> 
                            <h4 className={style.tableTitleMini}>카메라</h4>  
                            <h4 className={style.tableTitleMini}>마이크</h4> 
                            <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>화면 녹화</h4>
                            <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>화면 캡쳐</h4> 
                            <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}></h4>              
                        </div>
                        {
                            deviceInfo != null ? deviceInfo.map((item, idx) => {
                                return(
                                    <div className={style.tableItem} key={idx}>
                                        <span className={style.tableInfo}>{item.device}</span>
                                        <div className={style.tableInfo}>
                                            <label className={style.toggleBtn} onClick={() => {changeState(item.camera, idx, 1)}}>
                                                <div className={item.camera == true ? style.selectToggle : style.unselectToggle} />
                                            </label>
                                        </div>
                                        <div className={style.tableInfo}>
                                            <label className={style.toggleBtn} onClick={() => {changeState(item.mike, idx, 2)}}>
                                                <div className={item.mike == true ? style.selectToggle : style.unselectToggle} />
                                            </label>
                                        </div>
                                        <div className={style.tableInfo}>
                                            <label className={style.toggleBtn} onClick={() => {changeState(item.record, idx, 3)}}>
                                                <div className={item.record == true ? style.selectToggle : style.unselectToggle} />
                                            </label>
                                        </div>
                                        <div className={style.tableInfo}>
                                            <label className={style.toggleBtn} onClick={() => {changeState(item.screenShot, idx, 4)}}>
                                                <div className={item.screenShot == true ? style.selectToggle : style.unselectToggle} />
                                            </label>
                                        </div>
                                        <div className={style.tableInfo}>
                                            <button className={style.deviceSubmit} onClick={() => submitItem(idx)}>변경</button>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            null
                        }
                    </div>
                </div>
            </section> 
        </div>
    )
}

export default DeviceControl;