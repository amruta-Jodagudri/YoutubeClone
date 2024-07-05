import { combineReducers } from "redux";

import videoReducer from "./Video";
import authReducer from "./auth";
import chanelReducers from "./chanel";
import commentReducer from "./comments";
import currentUserReducer from "./currentUser";
import HistoryReducer from "./history";
import likedVideoReducer from "./likedVideo";
import userReducer from './user';
import watchLaterReducer from "./watchLater";

export default combineReducers({
    authReducer,
    currentUserReducer,
    chanelReducers,
    videoReducer,
    likedVideoReducer,
    watchLaterReducer,
    HistoryReducer,
    commentReducer,
    userReducer
});