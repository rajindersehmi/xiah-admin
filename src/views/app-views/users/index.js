import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserList from "./user-list";
import AddUser from "./add-user";
import EditUser from "./edit-user";

const Blogs = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-user`} component={AddUser} />
      <Route path={`${match.url}/edit-user/:id`} component={EditUser} />
      <Route path={`${match.url}/list`} component={UserList} />
    </Switch>
  );
};

export default Blogs;
