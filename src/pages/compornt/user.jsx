import {React, useState} from "react";
import { removeUser } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faComment, faThumbTack, faFlag, faBell, faPieChart } from "@fortawesome/free-solid-svg-icons";
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

    const [ul, setUl] = useState(false);
    const [tap, setTap] = useState(0);

    // Get Server
    const li = ['3회차 회의', 'JWT 토큰 기능 구현', '메인 페이지 작업', '코드 리팩토링', '디자인 체크'];
    
    // Get Server
    const message = [
        {name : '정사원', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMzBfMjk0%2FMDAxNjQwODcyMDczODg5.RpYrl_pS_EehRY7sW5Hq6IgF0HIvru-8_UqhfMv1FvUg.Y36BljvjCZ7UDIN4p0RJl3IaEfmsyvFFtP77rDphvOMg.JPEG.qizzip%2FIMG_0546.JPG&type=sc960_832', message : '일은 언제 다 할 수 있어?', count : 3}, 
        {name : '김대리', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMTNfMTMz%2FMDAxNjE1NjQ3MDYyMjkx.PYbmg_2oucv5cGM0wU4XhTyta639FBdEKr8H2Jx7PPMg.0JWsbAO0nPudKit8Zhu_TDgL7egA0TD0ZdlrVLvwymsg.JPEG.espart1226%2F71f8d35728e5fb4d10b6a463e335d51b.jpg&type=sc960_832', message : '얼른 일하세요 김사원', count : 2},
        {name : '부장님', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA2MThfNzAg%2FMDAxNDk3Nzk0MTU4Njky.9KekOyD9-2yx0YeRZNL1CB6f0OoLxKhxKYvVue4GgC8g.gH1Cgn-jDDxhSpzmCRrTUzrHr4qzhFGMIIpwfwLV6G4g.JPEG.dawnrosa%2FIMG_2046.jpg&type=sc960_832', message : '하는 일은 잘 되가는거지?', count : 1},
        {name : '금강선', photo : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MTlfOTQg%2FMDAxNjI0MDk4MDcwMzIz.SDwRw_4ZjWM5zU_vH0bJUaUdKZEG1bOYpB_EYtnV3C8g.zYLTv9vuCJWYumkRgJbu0aA1kxZ9SV_GfGcKFhj0n1kg.JPEG.tjsdud1794%2F1624088301192.jpg&type=a340', message : '저는 빛 그 자체입니다.', count : 4},
    ];

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
           <div className={style.content}>
                <div className={style.helloBox}>
                        <img className={style.userImg} src="/logo.png" /*Get Server *//>
                        <div className={style.hello}>
                            <p className={style.helloText}>{user.name}님 환영합니다</p>
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
                                        li.map((item, idx) => {
                                            return (
                                            <div className={style.mapItem} key = {idx}>
                                                <p>{item}</p>
                                            </div>)
                                        })
                                    }
                                </section>
                            </div>
                            <div className={style.messageBox}>
                                <div className={style.sectionHeader}>
                                    <div className={style.titleBox}>
                                        <FontAwesomeIcon icon = {faComment} className={style.titleIcon}/>
                                        <h3 className={style.title}> 최근 받은 메시지</h3>
                                    </div>
                                    <span className={style.more}>+ 더보기</span>
                                </div>
                                <section className={style.sectionItem}>
                                    {
                                        message.map((item, idx) =>
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
            <div className={style.chatBtnBox}>
                {
                    ul == true ?
                    <ul className={style.ul}>
                        <li className={style.li}><span className={style.liLink}><FontAwesomeIcon icon ={ faUser }/> 사용자 정보</span></li>
                        <li className={style.li}><span className={style.liLink}><FontAwesomeIcon icon ={ faComment }/> 채팅</span></li>
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

    // Get Server
    const notice = [
        {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)'}, 
        {title : '코로나 19 재택근무 관련 공지', day : '2022.06.02 (목)'}, 
        {title : '2022년 설날 휴무 관련 공지', day : '2022.01.01 (월)'}, 
        {title : '2021년도 총무식 관련 공지', day : '2021.12.20 (금)'}, 
        {title : '2021년도 상반기 결산 관련 공지', day : '2020.04.02 (목)'}, 
        {title : '자율 재택근무 관련 공지', day : '2022.07.02 (목)'}, 
        {title : '코로나 19 재택근무 관련 공지', day : '2022.06.02 (목)'}, 
        {title : '2022년 설날 휴무 관련 공지', day : '2022.01.01 (월)'}, 
        {title : '2021년도 총무식 관련 공지', day : '2021.12.20 (금)'}, 
        {title : '2021년도 상반기 결산 관련 공지', day : '2020.04.02 (목)'}, 
    ];

    // Get Server
    const alert = [
        {text : '업무 시간 시작', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '80%의 직원이 출근완료', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 9:00'},
        {text : '김사원 출근', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 8:56'},
        {text : '금부장 출근', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 8:40'},
        {text : '정부장 출근', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 8:36'},
        {text : '김대리 출근', img : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4192404.jpg', time : '2022.07.01 (금) 8:20'},
    ];

    return(
        <div className={style.tap1}>
            <div className={style.noticeBox}>
                <div className={style.sectionHeader}>
                    <div className = {style.titleBox}>
                        <FontAwesomeIcon icon = {faFlag} className={style.titleIcon}/>
                        <h3 className={style.title}> 공지사항</h3>
                    </div>
                    <span className={style.more}>+ 더보기</span>
                </div>
                <section className={style.sectionItem}>
                    {
                        notice.map((item, idx) => {
                            return (
                            <div className={style.mapItem} key={idx}>
                                <Link to="" className={style.noticeLink}>{item.title}</Link>
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
                        alert.map((item, idx) => {
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
    //Get Server
    const data = [
        {title : '근무중', value : 60, color : '#a1c6f1'},
        {title : '휴식', value : 7, color : '#7bdfd3'},
        {title : '외근', value : 11, color : '#4955ba'},
        {title : '휴가', value : 4, color : '#70a78b'},
        {title : '출장', value : 3, color : '#b378c9'},
        {title : '출근전', value : 15, color : '#cccccc'}
    ]

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
                        <PieChart data={data} lineWidth={30} lengthAngle ={360} animate className={style.chart}/>
                        <div className={style.chartPer}>출근율 : <span>{100 - data[data.length-1].value + "%"}</span></div>
                    </div>
                        <div className={style.chartLabel}>
                            {
                                data.map((item, idx) => {
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
        </div>
    )
}

const Tap3 = () =>
{
    return(
        <div className={style.fade}>
        </div>
    )
}

const Message = (props) =>
{
    return(
        <div className={style.messageItem}>
            <Link to ="" className={style.message}>
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