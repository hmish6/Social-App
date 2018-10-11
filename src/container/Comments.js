import { connect } from "react-redux";

import Component from "../components/Comments";

const mapStateToProps = state => ({
  user: state.socialReducers.user
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch({ type: "UPDATE_COMMENT", data })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
