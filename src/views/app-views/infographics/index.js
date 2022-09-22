import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddInfo from "./add-info";
import EditInfo from "./edit-info";
import InfoList from "./info-list";

const Brands = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-info`} component={AddInfo} />
      <Route path={`${match.url}/edit-info/:id`} component={EditInfo} />
      <Route path={`${match.url}/list`} component={InfoList} />
    </Switch>
  );
};

export default Brands;
