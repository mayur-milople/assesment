import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import { userReducer } from "./userReducer";

const persistConfig = {
  key: "persist-store",
  storage,
};

const reducers = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  users: persistReducer(persistConfig, userReducer),
});

export default reducers;
