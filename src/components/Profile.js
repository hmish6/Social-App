import React, { Component } from "react";

import { NavLink, Switch, Route } from "react-router-dom";

import Info from "./Info";
import RenderPost from "./RenderPost";
import People from "./People";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUser();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userFeeds: props.posts.filter(
        val => val.author.email === props.user.email
      )
    };
  }

  render() {
    if (this.props.user && this.state.userFeeds) {
      return (
        <div className=" col-md-6 m-auto">
          <Info user={this.props.user} />
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <NavLink
                exact
                to="/profile"
                className="nav-link text-uppercase d-flex justify-content-between align-items-center"
                activeClassName="active"
              >
                Posts
                <span className="badge badge-primary badge-pill">
                  {this.state.userFeeds.length}
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile/following"
                className="nav-link text-uppercase d-flex justify-content-between align-items-center"
                activeClassName="active"
              >
                Following
                <span className="badge badge-primary badge-pill">
                  {this.props.user.following.length}
                </span>
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route
              exact
              path="/profile"
              render={props => {
                this.props.getUser();
                return (
                  <RenderPost
                    {...props}
                    posts={this.state.userFeeds}
                    shouldGetRequest={true}
                  />
                );
              }}
            />
            <Route
              path="/profile/following"
              render={props => (
                <People
                  {...props}
                  people={this.props.user.following}
                  following={true}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
    return null;
  }
}
