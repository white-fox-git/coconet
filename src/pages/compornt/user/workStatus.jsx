import {React, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPieChart, faEnvelopeOpen, faTimeline } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/user.module.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

const WorkStatus = () =>
{
    const [chartData, setChartData] = useState();
    const [approvalData, setApprovalData] = useState();
    const [logData, setLogData] = useState();

    const getChartData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/chart')
        .then((res) => {
            setChartData(res.data);
        })
        .catch((error) => {
        })
    }

    const getApprovalData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/approval')
        .then((res) => {
            setApprovalData(res.data);
        })
        .catch((error) => {
        })
    }

    const getLogData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/log')
        .then((res) => {
            setLogData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getChartData();
        getApprovalData();
        getLogData();
    }, []);


    return(
        <div className={style.workStatus}>
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
                                <div className={style.chartPer}>출근율 : <span>{Math.ceil(100 - chartData.at(-1).value) + "%"}</span></div>
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
            <div className={style.workStatusGrid}>
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
                                            <img src={`http://211.200.250.190:7070/coconet/image/output?num=${item.userNum}`} className={style.approvalPhoto} />
                                        </div>
                                        <div className={style.approvalText}>
                                            <span className={style.approvalName}>{item.name} {item.title} 승인</span>
                                            <span className={style.approvalDay}>{item.date}</span>
                                        </div>
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
                            <h3 className={style.title}> 출퇴근 기록</h3>
                        </div>
                    </div>
                    <section className={style.sectionItem}>
                        {
                            logData != null && logData.map((item, idx) => {
                                return(
                                    <div className={style.logItem} key={idx}>
                                        <div className={style.log}>
                                            <img src={`http://211.200.250.190:7070/coconet/image/output?num=${item.userNum}`} className={style.approvalPhoto} />
                                            <div className={style.logUserInfo}>
                                                <p className={style.logName}>{item.name}</p>
                                                <p className={style.logPosition}>{item.department}</p>
                                            </div>
                                        </div>
                                        <div className={style.logTimeBox}>
                                            <div style={{backgroundColor : item.color, borderColor : item.color}} className={style.logState}>
                                                    {item.title}
                                            </div>
                                            <span style = {{borderColor : item.color}}className={style.logTime}>{item.date}</span>
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

export default WorkStatus;
