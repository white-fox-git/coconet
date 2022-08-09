import {React, useState, useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/admin.module.css";

const CommutingTime = () => {

    const [info, setInfo] = useState();

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        axios.get('http://211.200.250.190:7070/coconet/admin/worktime')
        .then((res) => {
            setInfo(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const enableInput = (id) => {

        let item = document.getElementById(id)
        let copy = [...info];

        if(item.disabled == true)
        {
           item.disabled = false;
           copy[id].state = true;
           setInfo(copy);
           item.focus();
        }
        else
        {
            setInfo(copy);
            axios({
                url : 'http://211.200.250.190:7070/coconet/admin/worktime/edit',
                method : "post",
                data : JSON.stringify(copy[id]),
                responseType : 'json',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            .then(() => {
                getInfo();
            })
            .catch((error) => {
                console.log(error);
                alert("업데이트 실패");
            })

            item.disabled = true;
        }
    }

    const modifyInfo = (e, idx) => {
        let copy = [...info];
        copy[idx].value = e;
        setInfo(copy);
    }

    const Enter = (e, id) => {
        if(e == 'Enter')
        {
            enableInput(id)
        }
    }

    return(
        <div className = {style.board}>
            <h2 className={style.boardTitle}>기본근무 시간</h2>
            <section className={style.tableBox}>
                {
                    info != null ? info.map((item, idx) => {
                        return(
                            <div className={style.tableItem} key={idx}>
                                <h4 className={style.tableTitle}>{item.title}</h4>
                                <div className={style.ctiInfoBox}>
                                    <input 
                                        type="text" 
                                        disabled 
                                        value={item.value} 
                                        className={style.ctiInfo} 
                                        id={idx} 
                                        onKeyPress={(e) => Enter(e.key, idx)} 
                                        onChange={(e) => {modifyInfo(e.target.value, idx);}}
                                    />
                                    <FontAwesomeIcon icon={item.state == false ?  faPen : faFloppyDisk} className={style.ctiInfoBtn} onClick={() => {enableInput(idx)}}/>
                                </div>
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

export default CommutingTime;