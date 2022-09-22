import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import List from "./list";

const PlatformProperties = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={List} />
    </Switch>
  );
};

export default PlatformProperties;
