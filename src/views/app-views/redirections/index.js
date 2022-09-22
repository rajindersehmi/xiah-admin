import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddRedirection from "./add-redirection";
import EditRedirection from "./edit-redirection";
import RedirectionList from "./redirection-list";

const Redirections = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-redirection`} component={AddRedirection} />
      <Route
        path={`${match.url}/edit-redirection/:id`}
        component={EditRedirection}
      />
      <Route path={`${match.url}/list`} component={RedirectionList} />
    </Switch>
  );
};

export default Redirections;
