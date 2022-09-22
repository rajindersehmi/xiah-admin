import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBlog from "./add-blog";
import BlogsList from "./blog-list";
import EditBlog from "./edit-blog";

const Blogs = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-blog`} component={AddBlog} />
      <Route path={`${match.url}/edit-blog/:id`} component={EditBlog} />
      <Route path={`${match.url}/list`} component={BlogsList} />
    </Switch>
  );
};

export default Blogs;
