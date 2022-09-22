import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BlogsList from "./permission-list";
import AddBlog from "./add-role";
import EditBlog from "./edit-role";

const Blogs = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-role`} component={AddBlog} />
      <Route path={`${match.url}/edit-role/:id`} component={EditBlog} />
      <Route path={`${match.url}/list`} component={BlogsList} />
    </Switch>
  );
};

export default Blogs;
