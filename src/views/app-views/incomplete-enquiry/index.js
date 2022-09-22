import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import IncompleteEnquiry from "./incomplete-enquiry";

const Incomplete = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={IncompleteEnquiry} />
    </Switch>
  );
};

export default Incomplete;
