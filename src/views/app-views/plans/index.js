import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PlanList from "./plan-list";
import AddBrand from "./add-plan";
import EditBrand from "./edit-plan";

const Brands = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-plan`} component={AddBrand} />
      <Route path={`${match.url}/edit-plan/:id`} component={EditBrand} />
      <Route path={`${match.url}/list`} component={PlanList} />
    </Switch>
  );
};

export default Brands;
