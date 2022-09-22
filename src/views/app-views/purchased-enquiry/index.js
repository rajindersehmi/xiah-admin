import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Pusrchased from "./purchased-list";

const Purchased = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={Pusrchased} />
    </Switch>
  );
};

export default Purchased;
