import React, { Component } from "react";
import axios from "axios";

import UserImage from "./UserImage";
import Comments from "../container/Comments";
import util from "../utils.js";
import { BASE_URL } from "../constants";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      likeAction: 0,
      isCommentBoxOpen: false
    };
  }
  isLiked() {
    if (this.state.likeAction === 1) {
      return true;
    }
    for (let value of this.props.post.likes) {
      if (value.email === this.props.user.email) {
        return true;
      }
    }
    return false;
  }

  likePost(e) {
    e.preventDefault();
    if (!this.isLiked()) {
      let req = {
        _id: this.props.post._id,
        like: [...this.props.post.likes, this.props.user._id]
      };
      this.updateLike(req);
    }
  }

  updateLike(data) {
    let option = {
      method: "patch",
      url: `${BASE_URL}/posts/like`,
      data: data
    };
    axios(option)
      .then(res => {
        this.setState({
          likeAction: 1
        });
      })
      .catch(e => console.error(e));
  }

  deletePost(e) {
    e.preventDefault();
    let option = {
      method: "delete",
      url: `${BASE_URL}/posts/${this.props.post._id}`
    };
    axios(option)
      .then(res => {
        this.setState({
          visible: false
        });
      })
      .catch(e => console.error(e));
  }
  toggleCommentBox(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isCommentBoxOpen: !prevState.isCommentBoxOpen
    }));
  }

  showDelete() {
    if (this.props.post.author.email === this.props.user.email) {
      return (
        <a href="#" className="ml-auto" onClick={e => this.deletePost(e)}>
          <i className="fa fa-trash" />
        </a>
      );
    }
    return null;
  }

  render() {
    let post = this.props.post,
      date = util.formatDate(post.timestamp),
      likeNumber = !this.props.shouldGetRequest
        ? post.likes.length + this.state.likeAction
        : post.likes.length,
      showDeleteBtn = this.showDelete(),
      likeColor = this.isLiked() ? "text-primary" : "text-dark",
      renderCommentBox = this.state.isCommentBoxOpen ? (
        <Comments post={post} />
      ) : null,
      commentColor = this.state.isCommentBoxOpen ? "text-primary" : "text-dark";
    if (this.state.visible || this.props.shouldGetRequest) {
      return (
        <div className="px-3 mb-5 bg-white border shadow-sm">
          <div className="d-flex align-items-center py-2 border-bottom">
            <UserImage userImage={post.author.image} />
            <div>
              <p className="m-0 text-info">{post.author.name}</p>
              <p className="m-0 text-black-50">{date}</p>
            </div>
            {showDeleteBtn}
          </div>
          <div className="py-2">
            <p>{post.description}</p>
          </div>
          <div className="d-flex justify-content-between py-2 border-bottom">
            <a href="#" onClick={e => this.likePost(e)} className={likeColor}>
              <i className="fa fa-thumbs-up mr-2" />
              <span>{likeNumber}</span>
            </a>
            <a
              href="#"
              className={commentColor}
              onClick={e => this.toggleCommentBox(e)}
            >
              <i className="fa fa-comment mr-2" />
              <span>{post.comments.length}</span>
            </a>
          </div>
          {renderCommentBox}
        </div>
      );
    }
    return null;
  }
}
