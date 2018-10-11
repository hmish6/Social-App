import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.categorizeList();
  }

  categorizeList() {
    if (this.props.user) {
      return [
        {
          value: "My Profile",
          link: "/profile",
          exact: false
        },
        {
          value: "Sign out",
          link: "/",
          clickHandler: e => this.clearLoginData(),
          exact: true
        }
      ];
    } else {
      return [
        {
          value: "Sign up",
          link: "/register",
          exact: true
        },
        {
          value: "Sign in",
          link: "/",
          exact: true
        }
      ];
    }
  }

  clearLoginData() {
    localStorage.removeItem("auth");
    localStorage.removeItem("isAuth");
    this.props.loggingOut();
  }

  generateList(obj) {
    let list = [];
    for (let item in obj) {
      list.push(
        <li key={item} className="nav-item" onClick={obj[item].clickHandler}>
          <NavLink
            exact={obj[item].exact}
            to={obj[item].link}
            className="nav-link text-light text-uppercase"
            activeClassName="bg-light text-dark"
          >
            {obj[item].value}
          </NavLink>
        </li>
      );
    }
    return list;
  }

  render() {
    let lists = this.generateList(this.categorizeList());
    return (
      <div>
        <ul className="nav bg-dark">
          <li className="nav-item">
            <NavLink
              to="/story"
              className="nav-link text-light text-uppercase"
              activeClassName="bg-light text-dark"
            >
              Homepage
              <i className="ml-2 fa fa-home" />
            </NavLink>
          </li>
          {lists}
        </ul>
      </div>
    );
  }
}
