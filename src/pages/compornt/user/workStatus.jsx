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
            console.log('Chart Error => ' + error);
            setChartData([
                {title : '근무중', value : 60, color : '#a1c6f1'},
                {title : '휴식', value : 7, color : '#7bdfd3'},
                {title : '외근', value : 11, color : '#4955ba'},
                {title : '휴가', value : 4, color : '#70a78b'},
                {title : '출장', value : 3, color : '#b378c9'},
                {title : '출근전', value : 15, color : '#cccccc'}
            ]);
        })
    }

    const getApprovalData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/approval')
        .then((res) => {
            setApprovalData(res.data);
        })
        .catch((error) => {
            console.log('Approval Error => ' + error);
            setApprovalData(
                [
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                    {state : '휴가', color : '#86ca89', name: '정사원',day : '2022.04.03(금)', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832'},
                ]
            )
        })
    }

    const getLogData = () => {
        axios.get('http://211.200.250.190:7070/coconet/board/log')
        .then((res) => {
            setLogData(res.data);
        })
        .catch((error) => {
            console.log('Log Error => ' + error);
            setLogData(
                [
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                    {state : '퇴근', color : '#86ca89', name: '김대리', position : '백엔드 개발', time : '오후 07:30', img : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDVfMjAy%2FMDAxNjQ5MTI3NjkxMTY5.CIJjlqtoI_U-xEPO4gV0kESVLVzDiZRVqFJVPGiYXbUg.PmCIdXeIy0--BTtGLpVG0Uqfv_skFotargeHYoes5ssg.JPEG.dshm__%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5%25C6%25C4%25C0%25CF%25A3%25DF20220405%25A3%25DF120037.jpg&type=sc960_832' },
                ]
            )
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

export default WorkStatus;
