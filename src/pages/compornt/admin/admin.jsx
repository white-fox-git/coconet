import {React, useState} from "react";
import { removeUser } from "../../../utils/redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/admin.module.css";
import CommutingTime from "./commutingTime";
import UserLog from "./userLog";
import AdminLog from "./adminLog";
import StatusManagement from "./statusManagement";
import AddUser from "./addUser";
import DeviceControl from "./deviceControl";

const User = (props) =>
{

    const [tap, setTap] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <>
           <div className = {style.bodyArea}>
            <aside className={style.aside}>
                    <div className={style.helloAdmin}>
                        <h2 className={style.adminLocation}>/Admin</h2>
                        <p className = {style.adminPage}>관리자 페이지</p>
                        <p className={style.tip}><FontAwesomeIcon icon={faLightbulb} className={style.tipLight}/> 관리자 페이지 Tip</p>
                    </div>
                    <nav className={style.nav}>
                        <ul className={style.menu}>
                            <li className={tap == 1 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(1)}}>출퇴근시간</li>
                            <li className={tap == 2 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(2)}}>근태 관리</li>
                            <li className={tap == 3 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(3)}}>디바이스 제어</li>
                            <li className={tap == 4 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(4)}}>사용자 로그</li>
                            <li className={tap == 5 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(5)}}>관리자 로그</li>
                            <li className={tap == 6 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(6)}}>신규 회원 추가</li>
                        </ul>
                    </nav>
                    <button className={style.logout} onClick={() => {
                        dispatch(removeUser());
                        navigate('/');
                    }}>로그아웃</button>
            </aside>
            <main className={style.main}>
                {
                    tap == 1 ? <CommutingTime /> : null
                }
                {
                    tap == 2 ? <StatusManagement /> : null
                }
                {
                    tap == 3 ? <DeviceControl /> : null
                }
                {
                    tap == 4 ? <UserLog /> : null
                }
                {
                    tap == 5 ? <AdminLog /> : null
                }
                {
                    tap == 6 ? <AddUser/> : null
                }
            </main>
           </div>
        </>
    )
}

export default User;