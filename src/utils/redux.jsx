import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const defaultData = JSON.parse(localStorage.getItem('user'));
axios.defaults.headers.common['Jwt_Access_Token'] = localStorage.getItem('JWT')

const user = createSlice({
    name : "user",
    initialState : defaultData, // user state 기본 값
    reducers : {
        setUser(state, res){
            const userData = res.payload;
            localStorage.setItem('user', JSON.stringify(res.payload));
            console.log(res.payload);

            return userData;
        },
        removeUser(state)
        {
            console.log('유저 삭제')
            delete axios.defaults.headers.common['Jwt_Access_Token'];
            sessionStorage.removeItem('Refresh_Token');
            localStorage.removeItem('user');
            const data = {name : '', authResult : false};

            return data;
        },
        refreshToken(state, token)
        {
            if(token.payload != null)
            {
                axios({
                    url : 'http://211.200.250.190:7070/coconet/reissue',
                    method : "post",
                    data : JSON.stringify({refreshToken : token.payload}),
                    responseType : 'json',
                    headers : {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*'
                    }
                })
                .then((res) => {
                    axios.defaults.headers.common['Jwt_Access_Token'] = res.headers.jwt_access_token;
                    localStorage.setItem('user', JSON.stringify(res.data));
                    sessionStorage.setItem('Refresh_Token', res.headers.jwt_refresh_token);
                    console.log('새로운 토큰이 발급되었습니다.');

                    return(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    removeUser();
                })
            }
            else
            {
                console.log('Refresh Token이 존재하지 않습니다.');
                removeUser();
            }
        }
    }
})

export let {setUser, removeUser, refreshToken} = user.actions;

export default configureStore({
  reducer: {
    user : user.reducer
   }
})
