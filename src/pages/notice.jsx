import React from "react";
import style from '../css/notice.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Notice = () =>
{
    let navigate = useNavigate();
    const [year, setYear] = useState(2022);
    const [notice, setNotice] = useState();

    const getNotice = (year) => {
        setYear(year);

        axios.get(`URL?year=${year}`)
        .then((res) => {
            setNotice(res.data);
        })
        .catch(() => {
            setNotice([
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 0},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 1},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 2},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 3},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 4},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 5},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 6},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 7},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 8},
                {title : '자율 재택근무 관련 공지', day : '2022.07.01 (금)', id : 9}
            ])
        })
    }

    useEffect(() => {
        getNotice(2022);
    }, [])

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
           <div className={style.noticeBox}>
                <div className={style.noticeTitleBox}>
                        <h5 className={style.title}>공지사항</h5>
                        <div className={style.selectYearBox}>
                            <button className={year == 2022 ? style.setSelectYear : style.selectYear} onClick={() => {getNotice(2022)}}>2022</button>
                            <button className={year == 2021 ? style.setSelectYear : style.selectYear} onClick={() => {getNotice(2021)}}>2021</button>
                            <button className={year == 2020 ? style.setSelectYear : style.selectYear} onClick={() => {getNotice(2020)}}>2020</button>
                        </div>
                </div>
                <section className={style.notice}>
                    {
                       notice!= null && notice.map((item, idx) => {
                        return(
                            <div className={style.noticeItem} key={idx}>
                                <Link to={"/noticePost"} state={{
                                    day : item.day,
                                    title : item.title,
                                    id : item.id
                                }} className={style.noticeLink}>{item.title}</Link>
                                <span className={style.noticeDay}>{item.day}</span>
                            </div>)
                        }) 
                    }          
                </section>
           </div>
        </>
    )
}

export default Notice;