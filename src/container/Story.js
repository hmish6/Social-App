import { connect } from "react-redux";

import Component from "../components/Story";

const mapStateToProps = state => ({
  authenticated: state.socialReducers.authenticated,
  user: state.socialReducers.user,
  posts: state.socialReducers.posts,
  people: state.socialReducers.suggestions
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: "STORY_DATA" })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
