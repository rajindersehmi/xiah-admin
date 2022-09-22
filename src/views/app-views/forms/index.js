import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FormList from "./form-list";

const Forms = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={FormList} />
    </Switch>
  );
};

export default Forms;
