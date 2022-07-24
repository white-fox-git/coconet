import {React, useState, useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import style from "../../css/admin.module.css";

const CommutingTime = () => {

    const [info, setInfo] = useState();

    useEffect(() => {
        axios.get('URL')
        .then((res) => {
            setInfo(res.data);
        })
        .catch((error) => {
            console.log("CommutingTime Error => " + error);
            setInfo(
                [{title : "근무일", value : "월-금", select : false},
                {title : "출근시간", value : "09:00", select : false},
                {title : "점심시간", value : "12:00 - 13:00", select : false},
                {title : "퇴근시간", value : "05:00", select : false},
                {title : "심야 퇴근시간", value : "09:00", select : false}]
            )
        });
    }, []);

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

            axios.post('URL', JSON.stringify(copy))
            .then((res) => {
                setInfo(res.data);
            })
            .catch((error) => {
                alert("업데이트 실패");
            })

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