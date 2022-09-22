import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PartnerList from "./partner-list";
import Profile from "./partner-profile";

const Blogs = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/profile/:id`} component={Profile} />
      <Route path={`${match.url}/list`} component={PartnerList} />
    </Switch>
  );
};

export default Blogs;
