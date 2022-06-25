import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name : "user",
    initialState : {name : '', auth : false, session : null}, // user state 기본 값
    reducers : {
        setUser(state, requset){

            state = requset.payload; // 서버에서 받아온 데이터 값을 user state에 저장함
            sessionStorage.setItem('user', requset.payload.session); // 세션 스토리지에 세션 정보 저장
        },
        removeUser(state)
        {
            state = {name : '', auth : false, session : null}; // 기본 값으로 초기화
            console.log('sign out');
            console.log('auth : ' + state.auth);
            sessionStorage.removeItem('user'); // seesion stroage의 user 세션 정보 삭제
        }
    }
})

export let {setUser, removeUser} = user.actions;

export default configureStore({
  reducer: {
    user : user.reducer
   }
})