import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddPage from "./add-page";
import EditPage from "./edit-page";
import PageList from "./page-list";

const Pages = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-page`} component={AddPage} />
      <Route path={`${match.url}/edit-page/:id`} component={EditPage} />
      <Route path={`${match.url}/list`} component={PageList} />
    </Switch>
  );
};

export default Pages;
