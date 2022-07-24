import {React, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import style from "../../css/admin.module.css";

const CommutingTime = () => {

    const [info, setInfo] = useState();

    const enableInput = (id) => {

        let item = document.getElementById(id)
        let copy = [...info];

        if(item.disabled == true)
        {
           item.disabled = false;
           copy[id].select = true;
           setInfo(copy);
           item.focus();
        }
        else
        {
            copy[id].select = false;
            setInfo(copy);
            item.disabled = true;
        }
    }

    const modifyInfo = (e, idx) => {
        console.log(e);
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
            <section className={style.commutingTimeBox}>
                {
                    info != null ? info.map((item, idx) => {
                        return(
                            <div className={style.commutingTimeItem} key={idx}>
                                <h4 className={style.ctiTitle}>{item.title}</h4>
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
                                    <FontAwesomeIcon icon={item.select == false ? faPen : faFloppyDisk} className={style.ctiInfoBtn} onClick={() => {enableInput(idx)}}/>
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