import { combineReducers } from "redux";
import page from "./page";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import topic from "./topic";

export default combineReducers({ page, auth, profile, post, topic });
