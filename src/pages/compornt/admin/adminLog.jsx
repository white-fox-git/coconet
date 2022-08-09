import {React, useState, useEffect} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const AdminLog = () => {

    const [adminLog, setAdminLog] = useState();

    useEffect(() => {
        axios.get('http://211.200.250.190:7070/coconet/logs/admin')
        .then((res) => {
            setAdminLog(res.data);
        })
        .catch(() => {
            setAdminLog(
                [
                    {user : "김현빈", tag :"login", title : "출근 시간 설정", date:"2022-07-20 08:59"},
                    {user : "김현빈", tag :"login", title : "출근 시간 설정", date:"2022-07-20 08:59"},
                    {user : "김현빈", tag :"login", title : "출근 시간 설정", date:"2022-07-20 08:59"},
                    {user : "김현빈", tag :"login", title : "출근 시간 설정", date:"2022-07-20 08:59"},
                ]
            )
        })
    }, []);

    return(
        <div className = {style.board}>
            <h2 className={style.boardTitle}>관리자 로그 조회</h2>
            <section className={style.tableBox}>
                <div className={style.tableItem}>
                    <h4 className={`${style.tableTitleMini}, ${style.tableInfo}`}>담당자</h4>
                    <h4 className={style.tableTitleMini}>태그</h4> 
                    <h4 className={style.tableTitleMini}>카테고리</h4>  
                    <h4 className={style.tableTitleMini}>시간</h4>                
                </div>
                {
                    adminLog != null ? adminLog.map((item, idx) => {
                        return(
                            <div className={style.tableItem} key={idx}>
                                <span className={style.tableInfo}>{item.user}</span>
                                <span className={style.tableInfo}>{item.tag}</span>
                                <span className={style.tableInfo}>{item.title}</span>
                                <span className={style.tableInfo}>{item.date}</span>
                            </div>
                        )
                    })
                    :
                    null
                }
            </section>
        </div>
    )
}

export default AdminLog;