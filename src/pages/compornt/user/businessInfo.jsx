import {React, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faBell, } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "../../../css/user.module.css";

const BusinessInfo = () =>
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
        <div className={style.businessInfo}>
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

export default BusinessInfo;