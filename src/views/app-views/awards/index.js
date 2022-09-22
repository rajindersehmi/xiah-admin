import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBrand from "./add-award";
import AwardList from "./award-list";
import EditBrand from "./edit-award";

const Brands = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-award`} component={AddBrand} />
      <Route path={`${match.url}/edit-award/:id`} component={EditBrand} />
      <Route path={`${match.url}/list`} component={AwardList} />
    </Switch>
  );
};

export default Brands;
