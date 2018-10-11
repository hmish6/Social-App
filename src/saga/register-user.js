import { BASE_URL } from "../constants";
import { call, put } from "redux-saga/effects";

import util from "../utils";

export default function* registerUser(action) {
  let options = {
    method: "post",
    url: `${BASE_URL}/users`,
    data: action.data
  };

  let data = yield call(util.postData, options);
  if (data.status === 200) {
    localStorage.setItem("isAuth", true);
    yield put({ type: "USER_FETCH", user: data.data });
  } else {
    localStorage.setItem("isAuth", false);
    yield put({ type: "ERROR_USER", error: data.data, page: "register" });
  }
}
