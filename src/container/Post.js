import { connect } from "react-redux";

import Component from "../components/Post";

const mapStateToProps = state => ({
  user: state.socialReducers.user
});

const Container = connect(mapStateToProps)(Component);

export default Container;
