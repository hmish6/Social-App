import React, { Component } from "react";

import SharePost from "../container/SharePost";
import RenderPost from "./RenderPost";
import People from "./People";

export default class Story extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    if (this.props.user) {
      return (
        <div className="row">
          <div className="col-md-6">
            <h4 className="lead">Feeds</h4>
            <SharePost />
            <RenderPost posts={this.props.posts} />
          </div>
          <div className="col-md-6">
            <h4 className="lead">Suggestions</h4>
            <People people={this.props.people} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
