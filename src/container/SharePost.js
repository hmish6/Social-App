import { connect } from "react-redux";

import Component from "../components/SharePost";

const mapStateToProps = state => ({
  user: state.socialReducers.user
});

const mapDispatchToProps = dispatch => ({
  submitPost: data => dispatch({ type: "POST_DATA", data })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
