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
        .catch((error) => {
            console.log(error);
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