import { BASE_URL } from "../constants";
import { call, put } from "redux-saga/effects";

import util from "../utils";

export default function* addComment(action) {
  let putComment = {
      method: "post",
      url: `${BASE_URL}/comments`,
      data: action.data
    },
    comment = yield call(util.postData, putComment),
    updatePost = {
      method: "patch",
      url: `${BASE_URL}/posts/comment`,
      data: { _id: comment.data.post, comment: comment.data._id }
    },
    retrievePost = {
      method: "get",
      url: `${BASE_URL}/posts`
    };
  yield call(util.postData, updatePost);
  let posts = yield call(util.getData, retrievePost);
  yield put({ type: "SUBMIT_POST", data: posts.data });
}
