import { BASE_URL } from "../constants";
import { call, put } from "redux-saga/effects";

import util from "../utils";

export default function* sharePost(action) {
  let putPost = {
      method: "post",
      url: `${BASE_URL}/posts`,
      data: action.data
    },
    retrievePost = {
      method: "get",
      url: `${BASE_URL}/posts`
    };
  yield call(util.postData, putPost);
  let posts = yield call(util.getData, retrievePost);
  yield put({ type: "SUBMIT_POST", data: posts.data });
}
