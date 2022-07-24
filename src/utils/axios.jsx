import axios from "axios";

const instance = axios.create({
    baseURL : 'http://211.200.250.190:7070',
    headers : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
    },
    instance : 2500
});

export default instance;