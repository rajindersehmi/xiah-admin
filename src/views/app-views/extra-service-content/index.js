import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddExtraService from "./add-extra-sevice";
import EditExtraService from "./edit-extra-service";
import ExtraServiceList from "./extra-service-list";

const ExtraService = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/add-extra-service`}
        component={AddExtraService}
      />
      <Route
        path={`${match.url}/edit-extra-service/:id`}
        component={EditExtraService}
      />
      <Route path={`${match.url}/list`} component={ExtraServiceList} />
    </Switch>
  );
};

export default ExtraService;
