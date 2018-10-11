import { combineReducers } from "redux";

const socialReducers = (
  state = {
    user: null,
    error: {
      register: null,
      login: null
    },
    posts: []
  },
  action
) => {
  switch (action.type) {
    case "USER_FETCH":
      return {
        user: action.user,
        error: {
          login: null,
          register: null
        },
        posts: state.posts
      };
    case "PAGE_NAME":
      return {
        ...state,
        pageName: action.name
      };
    case "ERROR_USER":
      return {
        user: null,
        error: {
          [action.page]: action.error
        },
        posts: state.posts,
        suggestions: []
      };
    case "STORY_RECEIVED":
      return {
        ...state,
        user: action.user,
        posts: action.posts,
        suggestions: action.people
      };
    case "SUBMIT_POST":
      return {
        ...state,
        posts: action.data
      };
    case "LOG_OUT":
      return {
        ...state,
        user: null,
        posts: []
      };
    default:
      return state;
  }
};

export default combineReducers({
  socialReducers
});
