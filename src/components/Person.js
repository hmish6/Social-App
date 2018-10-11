import React, { Component } from "react";
import axios from "axios";

import UserImage from "./UserImage";
import { BASE_URL } from "../constants";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: props.following || false
    };
  }

  addFollowing(e) {
    let option = {
      method: "patch",
      url: `${BASE_URL}/users/following`,
      data: { _id: this.props.user._id, follow: this.props.person._id }
    };
    axios(option)
      .then(res => {
        this.setState({
          following: true
        });
      })
      .catch(e => console.error(e));
  }

  setButton() {
    if (this.state.following) {
      return {
        value: "Following",
        class: "btn btn-success",
        disabled: true
      };
    }
    return {
      value: "Follow",
      class: "btn btn-primary",
      disabled: false
    };
  }

  render() {
    let button = this.setButton();
    return (
      <div className="p-3 d-flex justify-content-between mb- border-bottom">
        <div className="d-flex">
          <UserImage userImage={this.props.person.image} />
          <span className="align-self-center">{this.props.person.name}</span>
        </div>
        <input
          type="button"
          className={button.class}
          value={button.value}
          disabled={button.disabled}
          onClick={e => this.addFollowing(e)}
        />
      </div>
    );
  }
}
