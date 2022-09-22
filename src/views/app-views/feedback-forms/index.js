import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SubmissionList from "./submission-list";

const FeedbackForms = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={SubmissionList} />
    </Switch>
  );
};

export default FeedbackForms;
