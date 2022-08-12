import { persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import User from "./redux";

const persistConfig = {
    key : "user",
    storage
}

const rootReducer = combineReducers({ User : User });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const userStore = configureStore({
    reducer : persistedReducer
})

export default userStore;