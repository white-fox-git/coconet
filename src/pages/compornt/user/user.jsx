import {React, useState, useEffect} from "react";
import { removeUser } from "../../../utils/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faComment, faThumbTack, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import style from "../../../css/user.module.css";
import axios from "axios";
import BusinessInfo from "./BusinessInfo";
import WorkStatus from "./workStatus";
import DeviceManagement from "./deviceManagement";
import Message from "./message";

axios.defaults.timeout = 3000;

const User = () =>
{
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => { return state.user } );

    const [imgsrc, setImgsrc] = useState();
    const [todo, setTodo] = useState();
    const [ul, setUl] = useState(false);
    const [tap, setTap] = useState(0);
    const [state, setState] = useState(user.status);

    // Get Server
    const [todoList, setTodoList] = useState();
    const [message, setMessage] = useState();

    const getTodoList = () => {
        axios.get(`http://211.200.250.190:7070/coconet/board/todo?userNum=${user.userid}`)
        .then((res) => {
            setTodoList(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getMessage = () => {
        
        /*axios.get(`URL/message?message=${user.name}`)
        .then((res) => {
            setMessage(res.data);
        })
        .catch((error) => {
            
        });*/

        setMessage([
            {name : '정사원', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832', message : '일은 언제 다 할 수 있어?', count : 2, id: 0},
            {name : '김사원', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDNfMzQg%2FMDAxNjI3OTUyNzYyNjYx.MeunogcogYoUUdG3dIof_aZRvaJCKGEVHtW9hXte7wYg.9JCJJ8I9OX70w5p4OQB3KRodC3QBPAeUsYKN3vf1Eucg.JPEG.kimjin8946%2F30.jpg&type=sc960_832', message : '선배 이거 어떻게 해요?', count : 1, id: 1},
            {name : '정부장', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDJfMTAy%2FMDAxNjI3ODY3Mjg4OTE4.fSsvI5C1jzRaihZ9cf0Cr_Q0rZca-jKi6b-wcVdoWcsg.J_o6qJGoPuUIKxSTJ4ktNCer6T0mA45FcXWhSpmzBWsg.JPEG.wenice777%2F8.jpeg&type=sc960_832', message : '이번 크리스마스 때 출근 가능한가?', count : 4, id: 2},
            {name : '유과장', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDNfMjEw%2FMDAxNjE0NzgwMzAxNjk1.RymwABmkDl7R4SEqW9wxM7Mac_Zl8zzAXAob7LjccZcg.sWQwom3eaziWTh4BCY0f2D75X3_lwRj1Fw5fIC-aLNwg.JPEG.sosohan_n%2FIMG_3598.JPG&type=sc960_832', message : '자네 휴가가 짤릴 것 같아', count : 2, id: 3},
        ]);
    }

    const userImgLink = () => {
        return `http://211.200.250.190:7070/coconet/image/output?num=${user.userid}`;
    }

    useEffect(() => {
        getTodoList();
        getMessage();
        userImgLink();
    }, [])

    const todoSubmit = () => {
        const input = document.getElementById("inputTodo");

        axios({
            url : 'http://211.200.250.190:7070/coconet/board/todo/add',
            method : "post",
            data : JSON.stringify({userNum : user.userid, todo : todo}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            input.value = null;
            getTodoList();

        })
        .catch((error) => {
            input.value = null;
            setTodo();
            console.log(error);
        });
    }

    const pushState = (state) => {

        let status;

        if(state == "업무")
        {
            status = 10;
        }
        else
        {
            status = 12;
        }

        axios({
            url : 'http://211.200.250.190:7070/coconet/status/break',
            method : "post",
            data : JSON.stringify({num : user.userid}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            setState(status);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const checkTodo = (item) => {
        axios({
            url : 'http://211.200.250.190:7070/coconet/board/todo/check',
            method : "post",
            data : JSON.stringify({userNum : user.userid, todo : item.todo, todo_Check : item.todo_Check}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            getTodoList();
        })
        .catch(() => {
            alert('서버와의 연결에 실패했습니다.');
        })
    }

    const deleteTodo = (item) => {
        axios({
            url : 'http://211.200.250.190:7070/coconet/board/todo/delete',
            method : "delete",
            data : JSON.stringify({userNum : user.userid, todo : item}),
            responseType : 'json',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            getTodoList();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
            <header className={style.header}>
                <img src={"/logo_text.png"} className={style.logo} onClick={() => navigate('/main')}/>
           </header>
           <div className={style.content}>
                <div className={style.helloBox}>
                    <div className={style.userProfile}>
                        <div className={style.imgBox}>
                            <img className={style.userImg} src={userImgLink()}/>
                        </div>
                        <div className={style.hello}>
                            {
                                state == 12 ? <div className={style.restIcon} /> : <div className={style.workIcon} />
                            }
                            <div className={style.helloText}>{user.name}님 환영합니다</div>
                        </div>
                        <div className = {style.stateBox}>
                            <div className={style.stateItem}>
                                <div className={style.userState}>근무 상태</div>
                                <select className={style.state} value={user.state}onChange={(e) => {pushState(e.target.value)}}>
                                    <option value="업무">업무중</option>
                                    <option value="휴식">휴식중</option>
                                </select>
                            </div>
                        </div>
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
                                            <div className={style.todoItem} key = {idx}>
                                                <div className={style.todoItemBox}>
                                                    <label htmlFor={item.todo} className={item.todo_Check == "true" ? style.checkOn : style.checkOff}></label>
                                                    <input id={item.todo} type="checkbox" checked={item.todo_Check == "true" ? true : false} className={style.hidden} onChange = {() => {checkTodo(item)}}/>
                                                    <span className={item.todo_Check == "false" ? style.todo : style.checkedTodo}>{item.todo}</span>
                                                </div>
                                                <FontAwesomeIcon className={style.todoDelete} icon={faMinus} onClick={() => {deleteTodo(item.todo)}}/>
                                            </div>)
                                        })
                                    }
                                </section>
                                <div className={style.pushTodo} >
                                    <input type="text" id="inputTodo" className={style.todoInput} onChange={(e) => {setTodo(e.target.value)}}/>
                                    <button className={style.todoSubmit} onClick={() => {todoSubmit()}}>등록</button>
                                </div>
                            </div>
                            <div className={style.messageBox}>
                                <div className={style.sectionHeader}>
                                    <div className={style.titleBox}>
                                        <FontAwesomeIcon icon = {faComment} className={style.titleIcon}/>
                                        <h3 className={style.title}> 최근 받은 메시지</h3>
                                    </div>
                                    <span className={style.more} onClick ={() => {navigate('')}}>+ 더보기</span>
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