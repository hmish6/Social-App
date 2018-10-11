import { BASE_URL } from "../constants";
import { call, put } from "redux-saga/effects";

import util from "../utils";

export default function* getStoryData(action) {
  let token = localStorage.getItem("auth"),
    userOption = {
      method: "get",
      url: `${BASE_URL}/users/me`,
      headers: {
        "X-Auth-Token": token,
        "Access-Control-Request-Headers": "X-Auth-Token",
        "Access-Control-Allow-Headers": "X-Auth-Token"
      }
    },
    postOption = {
      method: "get",
      url: `${BASE_URL}/posts`
    };

  let user = yield call(util.getData, userOption),
    posts = yield call(util.getData, postOption),
    suggestions = {
      method: "get",
      url: `${BASE_URL}/users/suggestions/${user.data._id}`
    },
    people = yield call(util.getData, suggestions);
  yield put({
    type: "STORY_RECEIVED",
    user: user.data,
    posts: posts.data,
    people: people.data
  });
}
