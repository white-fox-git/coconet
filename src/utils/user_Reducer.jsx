import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./redux";

const persistConfig = {
  key: "user",
  storage,
};

export const rootReducer = combineReducers({
  userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer