import { connect } from "react-redux";

import Component from "../components/Login";

const mapStateToProps = state => ({
  error: state.socialReducers.error.login,
  user: state.socialReducers.user
});

const mapDispatchToProp = dispatch => ({
  validateUser: data => dispatch({ type: "AUTHENTICATE", data }),
  pageName: () => dispatch({ type: "PAGE_NAME", name: "Login" })
});

const Container = connect(mapStateToProps, mapDispatchToProp)(Component);

export default Container;
