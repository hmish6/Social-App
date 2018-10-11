import React, { Component } from "react";

import Post from "../container/Post";
import NoData from "./NoData";

export default class RenderPost extends Component {
  renderIndividualPost(posts) {
    let el = [];
    for (let index in posts) {
      el.push(
        <Post
          key={index}
          post={posts[index]}
          shouldGetRequest={this.props.shouldGetRequest}
        />
      );
    }
    return el;
  }

  sortedPost(data) {
    let feeds = data.sort((val1, val2) => {
      return (
        new Date(val2.timestamp).getTime() - new Date(val1.timestamp).getTime()
      );
    });
    return feeds;
  }

  render() {
    let feeds = this.sortedPost(this.props.posts);
    let Posts = this.renderIndividualPost(feeds);
    if (Posts.length === 0) {
      return <NoData>There are no posts in this section</NoData>;
    }
    return <div>{Posts}</div>;
  }
}
