import { React } from "react";
import { Link } from "react-router-dom";
import style from "../../../css/user.module.css";
const Message = (props) =>
{
    return(
        <div className={style.messageItem}>
            <Link to ={"/chat/" + props.user.id} className={style.message}>
                <img src={props.user.photo} className={style.messagePhoto} />
                <div className = {style.userBox}>
                    <h3 className={style.userName}>{props.user.name}</h3>
                    <p className={style.lastMessage}>{props.user.message}</p>
                </div>
            </Link>
            <div className = {style.messageCount}><p>{props.user.count}</p></div>
        </div>
    )
}

export default Message;