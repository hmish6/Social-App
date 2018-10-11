import { connect } from "react-redux";

import Component from "../components/Register";

const mapStateToProps = state => ({
  error: state.socialReducers.error.register,
  user: state.socialReducers.user
});

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch({ type: "REGISTER", data }),
  pageName: () => dispatch({ type: "PAGE_NAME", name: "Register" })
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;
