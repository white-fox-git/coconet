import {React, useState, useEffect} from "react";
import axios from "axios";
import style from "../../../css/info.module.css"

const Department = (props) => {


    return (
        <div className = {style.board}>
            <h5 className={style.title}>조직 정보</h5>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>부서</p>
                <input type="text" value={props.info.department} className={style.input} disabled/>
            </div>
            <div className={style.inputBox}>
                <p className={style.inputTitle}>직급</p>
                <input type="text" value={props.info.position} className={style.input} disabled/>
            </div>
        </div>
    )
}

export default Department;