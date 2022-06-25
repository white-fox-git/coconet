import {React, useState} from "react";
import {Link} from 'react-router-dom'
import style from '../css/findUser.module.css'

const FindUser = () =>
{
    let [tap, setTap] = useState(0); //tap uI 구현을 위한 state

    return(
        <div className ={style.rootBox}>
            <div className ={style.findBox}>
                <button className={tap == 0 ? style.clickTap : style.tap} onClick = {() => setTap(0)}>User</button>
                <button className={tap == 1 ? style.clickTap : style.tap} onClick = {() => setTap(1)}>Password</button>
            </div>
            <div className={style.blueLine} />
            <div className ={style.infoBox}>

            </div>
            <p className = {style.text}>You want Return to Sign In page <Link to = "/" className = {style.link}>Click here!</Link></p>
        </div>
    )
}

export default FindUser;