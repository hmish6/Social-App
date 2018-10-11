import { connect } from "react-redux";

import Component from "../components/Header";

const mapStateToProps = state => ({
  user: state.socialReducers.user,
  pageName: state.socialReducers.pageName
});

const mapDispatchToProps = dispatch => ({
  loggingOut: () => dispatch({ type: "LOG_OUT" })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
