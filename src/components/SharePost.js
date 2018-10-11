import React, { Component } from "react";

import UserImage from "./UserImage";
import util from "../utils.js";

export default class SharePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }
  enableSubmit(el) {
    this.setState({
      disabled: el.value === ""
    });
  }

  formSubmit(e) {
    let author = { author: this.props.user._id };
    util.prepareData(e, this.props.submitPost, author);
    this.setState({
      disabled: true
    });
  }

  render() {
    return (
      <div className="border shadow-sm mb-5 bg-white">
        <div className="py-2 px-3 border-bottom">
          <UserImage userImage={this.props.user.image} />
          <p className="d-inline-block align-middle mb-0">
            {this.props.user.name}
          </p>
        </div>
        <form onSubmit={e => this.formSubmit(e)}>
          <div className="form-group mx-5 my-3">
            <label htmlFor="createPost" className="text-secondary text-sm">
              Share your thoughts...
            </label>
            <textarea
              id="createPot"
              name="description"
              className="form-control"
              onChange={e => this.enableSubmit(e.target)}
            />
          </div>
          <div className="px-5 py-3">
            <input
              type="submit"
              className="btn btn-primary"
              disabled={this.state.disabled}
            />
          </div>
        </form>
      </div>
    );
  }
}
