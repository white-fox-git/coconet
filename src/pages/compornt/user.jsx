import {React, useState, useEffect} from "react";
import { removeUser } from "../../utils/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faComment, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import style from "../../css/user.module.css";
import axios from "axios";
import BusinessInfo from "./BusinessInfo";
import WorkStatus from "./workStatus";
import DeviceManagement from "./deviceManagement";
import Message from "./message";

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
                            tap == 0 ? <BusinessInfo /> : null
                        }
                        {
                            tap == 1 ? <WorkStatus /> : null
                        }
                        {
                            tap == 2 ? <DeviceManagement /> : null
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

export default User;