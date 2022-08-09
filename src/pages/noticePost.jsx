import React from "react";
import style from '../css/noticePost.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NoticePost = () =>
{
    let navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [post, setPost] = useState('');
    
    useEffect(() => {
        axios.get(`http://211.200.250.190:7070/coconet/board/notice/one?title=${data.title}&id=${data.id}&day=${data.day}`)
        .then((res) => {
            setPost(res.data);
        })
        .catch(() => {
            setPost({
                title : "네이버웍스 Drive 탐색기 v3.0버전 이하 강제 업데이트 안내",
                day : "2022.06.24(금)",
                date : `
안녕하세요, 네이버웍스입니다.
​
네이버웍스 Drive 탐색기를 이용해주셔서 감사합니다.
안정적인 Drive 탐색기 이용을 위해 v3.0 이하 버전을 사용하고 계신 사용자들을 대상으로
최신 버전으로 강제 업데이트가 2022년 7월 28일(목)에 진행됩니다.

자세한 업데이트 사항은 아래 내용을 확인해 주시기 바랍니다.

■ 업데이트 일정 : 2022년 7월 28일(목) 오전 7시경
※ 실제 팝업 노출 시간은 사용자의 컴퓨터, 네트워크 환경에 따라 상이할 수 있습니다.
※ 업데이트 팝업은 공식 권장 환경에서 Drive 탐색기를 이용 중인 고객들께만 노출됩니다. 네이버웍스의 공식 권장 환경은 여기를 확인해주세요.

                    

■ 업데이트 버전 정보
 Windows Drive 탐색기 v3.4.3
 macOS Drive 탐색기 v3.4.4

■ 업데이트 대상자
 Drive 탐색기 v3.0 버전 이하 사용자
※ Drive 탐색기 버전은 다음과 같이 확인하실 수 있습니다.
[Tray 메뉴의 드라이브 탐색기 아이콘 마우스 오른쪽 버튼 클릭 > 정보 > Version]

네이버웍스에서는 원활한 서비스 제공을 위해 최신 버전의 앱을 사용하시는 것을 권장합니다.
이와 관련해서 궁금한 점이 있으신 분은 네이버웍스 헬프센터(1544-5876) 및 온라인 문의하기로 문의 부탁드립니다.

감사합니다.`
            });
        })
    }, []);

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
           <div className={style.postBox}>
                <FontAwesomeIcon icon={faArrowLeft} className={style.arrow} onClick={() => {navigate(-1)}}/>
                <h3 className={style.title}>{post.title}</h3>
                <p className={style.day}>Day : {post.day}</p>
                <pre className={style.postData}>{post.date}</pre>
            </div>      
        </>
    )
}

export default NoticePost;