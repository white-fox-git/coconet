import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name : "user",
    initialState : {name : '', auth : false, session : null},
    reducers : {
        setUser(state, requset){

            state = requset.payload; // 서버에서 받아온 데이터 값을 저장함
            sessionStorage.setItem('user', requset.payload.user); // 세션 스토리지에 유저 정보 저장
        },
        removeUser(state)
        {
            state = {name : '', auth : false, session : null};
            console.log('sign out');
            console.log('auth : ' + state.auth);
            sessionStorage.removeItem('user');
        }
    }
})

export let {setUser, removeUser} = user.actions;

export default configureStore({
  reducer: {
    user : user.reducer
   }
})