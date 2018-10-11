import { connect } from "react-redux";

import Component from "../components/Profile";

const mapStateToProps = state => ({
  user: state.socialReducers.user,
  posts: state.socialReducers.posts
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: "STORY_DATA" })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
