import {React, useState} from "react";
import { removeUser } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import style from "../../css/main.module.css";

const User = (props) =>
{
    const [bar, setBar] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date =  today.getDate();

    return(
        <>
           
        </>
    )
}

export default User;