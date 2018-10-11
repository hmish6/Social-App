import { takeLatest, all } from "redux-saga/effects";

import addComment from "./saga/add-comment";
import authenticateUser from "./saga/authenticate-user";
import registerUser from "./saga/register-user";
import sharePost from "./saga/share-post";
import getStoryData from "./saga/get-story";

function* listenToRegister() {
  yield takeLatest("REGISTER", registerUser);
}

function* listenToLogin() {
  yield takeLatest("AUTHENTICATE", authenticateUser);
}

function* listenToPost() {
  yield takeLatest("POST_DATA", sharePost);
}

function* listenToComment() {
  yield takeLatest("UPDATE_COMMENT", addComment);
}

function* fetchStoryData() {
  yield takeLatest("STORY_DATA", getStoryData);
}

export default function* middleware() {
  yield all([
    listenToRegister(),
    listenToLogin(),
    fetchStoryData(),
    listenToPost(),
    listenToComment()
  ]);
}
