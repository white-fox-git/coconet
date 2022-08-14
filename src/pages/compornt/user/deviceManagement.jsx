import {React, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { faTimeline, faMobileScreen, faCube, faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/user.module.css";
import axios from "axios";

const DeviceManagement = () =>
{

    let user = useSelector((state) => {return state.user});

    const [deviceLog, setDeviceLog] = useState([]);
    
    const [device, setDevice] = useState();

    const getDeviceInfo = () => {
        axios.get(`http://211.200.250.190:7070/coconet/device/one?userNum=${user.userid}`)
        .then((res) => {
             setDevice(res.data[0])
        })
        .catch((error) => {
            console.log(error);
        })
    } 

    const getDeviceLog = () => {
        axios.get(`http://211.200.250.190:7070/coconet/device/log?userNum=${user.userid}`)
        .then((res) => {
             setDeviceLog(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    } 

    useEffect(() => {
        getDeviceInfo();
        getDeviceLog();
    }, [])

    return(
        <div className={style.deviceManagement}>
            <div className={style.logBox}>
                <div className={style.sectionHeader}>
                    <div className={style.titleBox}>
                        <FontAwesomeIcon icon = {faMobileScreen} className={style.titleIcon}/>
                        <h3 className={style.title}> 현재 등록된 디바이스</h3>
                    </div>
                </div>
                {
                    device != null ?
                    <>
                        <section className={style.deviceInfoBox}>
                            <div className={style.deviceInfo}>
                                <h4 className={style.deviceOs}>{device.os}</h4>
                                <h3 className={style.deviceName}>{device.device}</h3>
                            </div>
                        </section>
                        <section className={style.deviceInfoBox}>
                            <div className={style.deviceInfo}>
                                <h5 className={style.deviceTitle}><FontAwesomeIcon icon={faCube} className={style.deviceTitleIcon}/> 전체 상태 보기</h5>
                                <div className={style.iconBox}>
                                    <div className={device.camera == true ? style.acceptIcon : style.banIcon}>
                                        <img src='/ic_camera.svg' className={style.icon}/>
                                    </div>
                                    <div className={device.mike == true ? style.acceptIcon : style.banIcon}>
                                        <img src='/ic_mike.svg' className={style.icon}/>
                                    </div>
                                    <div className={device.record == true ? style.acceptIcon : style.banIcon}>
                                        <img src='/ic_record.svg' className={style.icon}/>
                                    </div>
                                    <div className={device.screenShot == true ? style.acceptIcon : style.banIcon}>
                                        <img src='/ic_screenshot.svg' className={style.icon}/>
                                    </div>
                                </div> 
                            </div>
                        </section>
                        <section className={style.deviceInfoBox}>
                            <div className={style.deviceInfo}>
                                <h5 className={style.deviceTitle}><FontAwesomeIcon icon={faCircleCheck} className={style.deviceTitleIcon}/> 허용됨</h5>
                                <span className={style.infoText}>해당 기능은 업무중에도 사용이 가능합니다</span>
                                <div className={style.iconBox}>
                                {
                                    device.camera == true ?
                                    <>
                                        <div className={style.acceptIcon}>
                                            <img src='/ic_camera.svg' className={style.icon}/>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {
                                    device.mike == true ?
                                    <>
                                        <div className={style.acceptIcon}>
                                            <img src='/ic_mike.svg' className={style.icon}/>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {
                                    device.record == true ?
                                    <>
                                        <div className={style.acceptIcon}>
                                            <img src='/ic_record.svg' className={style.icon}/>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {
                                    device.screenShot == true ?
                                    <>
                                        <div className={style.acceptIcon}>
                                            <img src='/ic_screenshot.svg' className={style.icon}/>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                </div> 
                            </div>
                        </section>
                        <section className={style.deviceInfoBox}>
                            <div className={style.deviceInfo}>
                                <h5 className={style.deviceTitle}><FontAwesomeIcon icon={faBan} className={style.deviceTitleIcon}/> 차단됨</h5>
                                <span className={style.infoText}>해당 기능은 업무중에 사용이 불가능합니다</span>
                                <div className={style.iconBox}>
                                    {
                                        device.camera != true ?
                                        <>
                                            <div className={style.banIcon}>
                                                <img src='/ic_camera.svg' className={style.icon}/>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {
                                        device.mike != true ?
                                        <>
                                            <div className={style.banIcon}>
                                                <img src='/ic_mike.svg' className={style.icon}/>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {
                                        device.record != true ?
                                        <>
                                            <div className={style.banIcon}>
                                                <img src='/ic_record.svg' className={style.icon}/>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {
                                        device.screenShot != true ?
                                        <>
                                            <div className={style.banIcon}>
                                                <img src='/ic_screenshot.svg' className={style.icon}/>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                </div> 
                            </div>
                        </section>
                    </>
                    :
                    null
                }
            </div>
            <div className={style.logBox}>
                <div className={style.sectionHeader}>
                    <div className={style.titleBox}>
                        <FontAwesomeIcon icon = {faTimeline} className={style.titleIcon}/>
                        <h3 className={style.title}> 디바이스 제어 기록</h3>
                    </div>
                </div>
                <section className={style.sectionItem}>
                    {
                        deviceLog != null && deviceLog.map((item, idx) => {
                            return(
                                <div className={style.alertItem} key={idx}>
                                    <img src ={`http://211.200.250.190:7070/coconet/image/output?num=${item.userNum}`} className={style.alertIcon}/>
                                    <div className={style.alertText}>
                                        <span>{item.title}</span>
                                        <span className={style.alertTime}>{item.date}</span>
                                    </div>
                                </div>
                                )
                            })
                        }
                </section>
            </div>
        </div>
    )
}

export default DeviceManagement;