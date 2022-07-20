import {React, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimeline, faMobileScreen, faCube, faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import style from "../../css/user.module.css";
import axios from "axios";

const DeviceManagement = () =>
{

    const [deviceLog, setDeviceLog] = useState([
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '업무 시간 시작', img : 'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201359/52097507-%EC%95%8C%EB%A6%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg', time : '2022.07.01 (금) 9:00'}
    ]);
    
    const [device, setDevice] = useState(
        {
            name : 'Galuxy Note 10+',
            os : 'Android',
            camera : true,
            mike : true,
            record : true,
            screenShout : false
        }
    )

    useEffect(() => {

    })

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
                                <h3 className={style.deviceName}>{device.name}</h3>
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
                                    <div className={device.screenShout == true ? style.acceptIcon : style.banIcon}>
                                        <img src='/ic_screenShout.svg' className={style.icon}/>
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
                                    device.screenShout == true ?
                                    <>
                                        <div className={style.acceptIcon}>
                                            <img src='/ic_screenShout.svg' className={style.icon}/>
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
                                        device.screenShout != true ?
                                        <>
                                            <div className={style.banIcon}>
                                                <img src='/ic_screenShout.svg' className={style.icon}/>
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
                                    <img src = {item.img} className={style.alertIcon}/>
                                    <div className={style.alertText}>
                                        <span>{item.text}</span>
                                        <span className={style.alertTime}>{item.time}</span>
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