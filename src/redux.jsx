import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const defaultData = {name : '', auth : false};

const user = createSlice({
    name : "user",
    initialState : {name : '김현빈', auth : true}, // user state 기본 값
    reducers : {
        setUser(state, res){
            
            return res.payload;
        },
        removeUser(state)
        {
            return defaultData;
        },
    }
})

export let {setUser, removeUser} = user.actions;

export default configureStore({
  reducer: {
    user : user.reducer
   }
})