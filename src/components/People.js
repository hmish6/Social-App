import React, { Component } from "react";

import Person from "../container/Person";
import NoData from './NoData';

export default class People extends Component {
  renderPeople() {
    let user = [];
    for (let index in this.props.people) {
      user.push(
        <Person
          key={index}
          person={this.props.people[index]}
          following={this.props.following}
        />
      );
    }
    return user;
  }

  render() {
    let person = this.renderPeople();
    if(person.length === 0) {
      return <NoData>There are no people to show here</NoData> 
    }
    return <div className="border shadow-sm bg-white">{person}</div>;
  }
}
