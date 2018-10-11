import React from "react";
import { Switch, Route } from "react-router";

import PrivateRoute from "../container/PrivateRoute";

import Register from "../container/Register";
import Login from "../container/Login";
import Story from "../container/Story";
import Profile from "../container/Profile";

const Router = props => {
  return (
    <div className="p-5">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/story" component={Story} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default Router;
