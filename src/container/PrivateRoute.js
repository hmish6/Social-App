import { connect } from "react-redux";

import Component from "../components/PrivateRoutes";

const mapStateToProps = state => ({
  auth: state.socialReducers.authenticated
});

const Container = connect(mapStateToProps)(Component);

export default Container;
