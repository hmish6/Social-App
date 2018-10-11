import React, { Component } from "react";

import UserImage from "./UserImage";
import util from "../utils.js";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true
    };
  }
  enableSubmit(el) {
    this.setState({
      isDisabled: el.value === ""
    });
  }

  renderComments(data) {
    let el = [];
    for (let index in data) {
      let content = data[index],
        date = util.formatDate(content.timestamp);
      el.push(
        <div key={index} className="d-flex align-items-center mb-3">
          <UserImage userImage={content.author.image} />
          <div className="bg-white w-100 p-2">
            <p className="mb-1">{content.author.name}</p>
            <p className="mb-1">{content.description}</p>
            <small className="text-muted">{date}</small>
          </div>
        </div>
      );
    }
    return el;
  }

  formSubmit(e) {
    let userData = { post: this.props.post._id, author: this.props.user._id };
    util.prepareData(e, this.props.addComment, userData);
    this.setState({
      isDisabled: true
    });
  }

  render() {
    let post = this.props.post,
      Comments = this.renderComments(post.comments);
    return (
      <div className="py-2">
        <form
          className="d-flex align-items-center my-3"
          onSubmit={e => this.formSubmit(e)}
        >
          <UserImage userImage={this.props.user.image} />
          <div className="input-group">
            <label htmlFor="commentDescription" className="sr-only">
              Comment
            </label>
            <textarea
              id="commentDescription"
              className="form-control"
              name="description"
              placeholder="Write something..."
              onChange={e => this.enableSubmit(e.target)}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Add"
                className="btn btn-outline-primary"
                disabled={this.state.isDisabled}
              />
            </div>
          </div>
        </form>
        {Comments}
      </div>
    );
  }
}
