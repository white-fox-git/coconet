import {React, useState, useEffect} from "react";
import { removeUser } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faComment, faThumbTack, faFlag, faBell, faPieChart, 
    faEnvelopeOpen, faTimeline, faMobileScreen, faCube, faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import style from "../../css/user.module.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

const User = () =>
{
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => { return state.user } )

    const [todo, setTodo] = useState();
    const [ul, setUl] = useState(false);
    const [tap, setTap] = useState(0);

    // Get Server
    const [todoList, setTodoList] = useState();
    const [message, setMessage] = useState();

    const getTodoList = () => {
        axios.post('', {name : user.name})
        .then((res) => {
            setTodoList(res.data);
        })
        .catch((error) => {
            console.log('Todo List Error => ' + error);
        });
    }

    const getMessage = () => {
        axios.post('', {name : user.name})
        .then((res) => {
            setMessage(res.data);
        })
        .catch((error) => {
            console.log('Message Error => ' + error);
        });
    }

    useEffect(() => {
        getTodoList();
        getMessage();
    }, [])

    const todoSubmit = () => {
        axios.post('URL', JSON.stringify({user : user.name, todo : todo}))
        .then((res) => {
            console.log('Success : ' + res.data);
            getTodoList();
        }).catch((error) => {
            console.log(error);
        })
    }

    const pushState = (state) => {

        console.log({name : user.name, state : state});
        axios.post('URL', {name : user.name, state : state})
        .then((data) => {
            console.log(data.res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
           <div className={style.content}>
                <div className={style.helloBox}>
                        <img className={style.userImg} src="/logo.png" /*Get Server *//>
                        <div className={style.hello}>
                            <span className={style.helloText}>{user.name}님 환영합니다</span>
                        </div>
                        <div className = {style.stateBox}>
                            <button className = {`${style.attendance}, ${style.stateBtn}`} onClick ={() => pushState('출근')}>출근</button>
                            <button className = {`${style.leave}, ${style.stateBtn}`} onClick ={() => pushState('퇴근')}>퇴근</button>
                            <button className = {`${style.rest}, ${style.stateBtn}`} onClick ={() => pushState('휴식')}>휴식</button>
                        </div>
                        <div className={style.helloItem}>
                            <div className={style.todayBox}>
                                <div className={style.sectionHeader}>
                                    <div className={style.titleBox}>
                                        <FontAwesomeIcon icon = {faThumbTack} className={style.titleIcon}/>
                                        <h3 className={style.title}> 오늘의 업무</h3>
                                    </div>
                                </div>
                                <section className={style.sectionItem}>
                                    {
                                        todoList != null && todoList.map((item, idx) => {
                                            return (
                                            <div className={style.mapItem} key = {idx}>
                                                <span>{item}</span>
                                                <input type="checkbox" className={style.todoCheck} onClick = {(idx) => {

                                                }}/>
                                            </div>)
                                        })
                                    }
                                </section>
                                <div className={style.pushTodo} >
                                    <input type="text" className={style.todoInput} onChange={(e) => {setTodo(e.target.value)}}/>
                                    <button className={style.todoSubmit} onClick={() => {todoSubmit()}}>등록</button>
                                </div>
                            </div>
                            <div className={style.messageBox}>
                                <div className={style.sectionHeader}>
                                    <div className={style.titleBox}>
                                        <FontAwesomeIcon icon = {faComment} className={style.titleIcon}/>
                                        <h3 className={style.title}> 최근 받은 메시지</h3>
                                    </div>
                                    <span className={style.more} onClick ={() => {navigate('/chat')}}>+ 더보기</span>
                                </div>
                                <section className={style.sectionItem}>
                                    {
                                        message != null && message.map((item, idx) =>
                                        {
                                            return <Message user={item} key = {idx}/>
                                        })
                                    }
                                </section>
                            </div>
                        </div>
                </div>
                <div className={style.board}>
                    <div className={style.tapBox}>
                        <button className={tap == 0 ? style.setTap : style.tap} onClick={() => setTap(0)}>업무 정보</button>
                        <button className={tap == 1 ? style.setTap : style.tap} onClick={() => setTap(1)}>근무 현황</button>
                        <button className={tap == 2 ? style.setTap : style.tap} onClick={() => setTap(2)}>기기 관리</button>
                    </div>
                    <div className = {style.tapItem}>
                        {
                            tap == 0 ? <Tap1/> : null
                        }
                        {
                            tap == 1 ? <Tap2/> : null
                        }
                        {
                            tap == 2 ? <Tap3/> : null
                        }
                    </div>
                </div>
            </div>
            <footer className={style.footer}>
                
            </footer>
            <div className={style.chatBtnBox}>
                {
                    ul == true ?
                    <ul className={style.ul}>
                        <li className={style.li}><span className={style.liLink} onClick={() => {navigate('/info')}}><FontAwesomeIcon icon ={ faUser }/> 사용자 정보</span></li>
                        <li className={style.li}><span className={style.liLink} onClick={() => {navigate('/chat')}}><FontAwesomeIcon icon ={ faComment }/> 채팅</span></li>
                        <li className={style.li}><span className={style.liLink} onClick={() => {
                            dispatch(removeUser());
                            navigate('/');
                        }}><FontAwesomeIcon icon ={ faRightFromBracket }/> 로그아웃</span></li>
                    </ul>
                    :
                    null
                }
                <button className={style.chatBtn} onClick={() => {ul == true ? setUl(false) : setUl(true)}}><FontAwesomeIcon icon ={ faUser }/></button>
            </div>
        </>
    )
}

const Tap1 = () =>
{


    let navigate = useNavigate();


    const [notice, setNotice] = useState();
    const [alert, serAlert] = useState();

    const getNotice = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/notice')
        .then((res) => {
            setNotice(res.data);
        })
        .catch((error) => {
            console.log('Notice Error => ' + error);
        })
    }

    const getAlert = () => {
        axios.get('')
        .then((res) => {

        })
        .catch((error) => {
            console.log('Alert Error => ' + error);
        })
    }
    
    useEffect(() => {
        getNotice();
        getAlert();
    }, []);


    return(
        <div className={style.tap1}>
            <div className={style.noticeBox}>
                <div className={style.sectionHeader}>
                    <div className = {style.titleBox}>
                        <FontAwesomeIcon icon = {faFlag} className={style.titleIcon}/>
                        <h3 className={style.title}> 공지사항</h3>
                    </div>
                    <span className={style.more}  onClick={() => navigate('/notice')}>+ 더보기</span>
                </div>
                <section className={style.sectionItem}>
                    {
                       notice!= null && notice.map((item, idx) => {
                        return(
                            <div className={style.mapItem} key={idx}>
                            <Link to={"/notice/" + item.id} className={style.noticeLink}>{item.title}</Link>
                            <span className={style.noticeDay}>{item.day}</span>
                            </div>)
                        }) 
                    }          
                </section>
            </div>
            <div className={style.noticeBox}>
                <div className={style.sectionHeader}>
                    <div className = {style.titleBox}>
                        <FontAwesomeIcon icon = {faBell} className={style.titleIcon}/>
                        <h3 className={style.title}> 알림</h3>
                    </div>
                    <span className={style.more}>+ 더보기</span>
                </div>
                <section className={style.sectionItem}>
                    {
                        alert != null && alert.map((item, idx) => {
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

const Tap2 = () =>
{
    const [chartData, setChartData] = useState();
    const [approvalData, setApprovalData] = useState();
    const [logData, setLogData] = useState();

    const getChartData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/chart')
        .then((res) => {
            setChartData(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Chart Error => ' + error);
        })
    }

    const getApprovalData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/approval')
        .then((res) => {
            setApprovalData(res.data);
        })
        .catch((error) => {
            console.log('Approval Error => ' + error);
        })
    }

    const getLogData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/log')
        .then((res) => {
            setLogData(res.data);
        })
        .catch((error) => {
            console.log('Log Error => ' + error);
        })
    }

    useEffect(() => {
        getChartData();
        getApprovalData();
        getLogData();
    }, []);


    return(
        <div className={style.tap2}>
            <div className={style.chartBox}>
                <div className={style.sectionHeader}>
                    <div className={style.titleBox}>
                        <FontAwesomeIcon icon = {faPieChart} className={style.titleIcon}/>
                        <h3 className={style.title}> 근무 현황</h3>
                    </div>
                </div>
                <div className={style.chartItem}>
                    <div className={style.chartSection}>
                        {
                            chartData != null ? 
                            <>
                                <PieChart data={chartData} lineWidth={30} lengthAngle ={360} animate className={style.chart}/>
                                <div className={style.chartPer}>출근율 : <span>{100 - chartData.at(-1).value + "%"}</span></div>
                            </>
                            :
                            null
                        }
                    </div>
                        <div className={style.chartLabel}>
                            {
                                chartData != null && chartData.map((item, idx) => {
                                    return(
                                        <div key = {idx} className={style.label}>
                                            <div className={style.labelText}>
                                                <span style={{color : item.color}} className={style.square}>
                                                    ■ 
                                                </span>
                                                <span> {item.title}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
            <div className={style.tap2Grid}>
                <div className={style.approvalBox}>
                    <div className={style.sectionHeader}>
                        <div className={style.titleBox}>
                            <FontAwesomeIcon icon = {faEnvelopeOpen} className={style.titleIcon}/>
                            <h3 className={style.title}> 결재</h3>
                        </div>
                    </div>
                    <section className={style.sectionItem}>
                        {
                            approvalData != null && approvalData.map((item, idx) => {
                                return(
                                    <div className={style.approvalItem} key={idx}>
                                        <div className={style.approval}>
                                            <div style={{backgroundColor : item.color}} className={style.approvalState}>
                                                {item.state}
                                            </div>
                                            <img src={item.img} className={style.approvalPhoto} />
                                            <span className={style.approvalName}>{item.name}</span>
                                        </div>
                                        <span className={style.approvalDay}>{item.day}</span>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
                <div className={style.logBox}>
                    <div className={style.sectionHeader}>
                        <div className={style.titleBox}>
                            <FontAwesomeIcon icon = {faTimeline} className={style.titleIcon}/>
                            <h3 className={style.title}> 실시간 기록</h3>
                        </div>
                    </div>
                    <section className={style.sectionItem}>
                        {
                            logData != null && logData.map((item, idx) => {
                                return(
                                    <div className={style.logItem} key={idx}>
                                        <div className={style.log}>
                                            <img src={item.img} className={style.approvalPhoto} />
                                            <div className={style.logUserInfo}>
                                                <p className={style.logName}>{item.name}</p>
                                                <p className={style.logPosition}>{item.position}</p>
                                            </div>
                                        </div>
                                        <div className={style.logTimeBox}>
                                            <div style={{borderColor : item.color}} className={style.logState}>
                                                    {item.state}
                                            </div>
                                            <span style = {{borderColor : item.color}}className={style.logTime}>{item.time}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}

const Tap3 = () =>
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
        <div className={style.tap3}>
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
                                <h4 classNAme={style.deviceOs}>{device.os}</h4>
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

const Message = (props) =>
{
    return(
        <div className={style.messageItem}>
            <Link to ={"/chat/" + props.user.id} className={style.message}>
                <img src={props.user.photo} className={style.messagePhoto} />
                <div className = {style.userBox}>
                    <h3 className={style.userName}>{props.user.name}</h3>
                    <p className={style.lastMessage}>{props.user.message}</p>
                </div>
            </Link>
            <div className = {style.messageCount}><p>{props.user.count}</p></div>
        </div>
    )
}

export default User;