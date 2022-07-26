import {React, useState, useEffect} from "react";
import axios from "axios";
import style from "../../../css/admin.module.css";

const AddUser = () => {

    return (
        <div className = {style.board}>
            <h2 className={style.boardTitle}>신규 회원 추가</h2>
        </div>
    )
}

export default AddUser;