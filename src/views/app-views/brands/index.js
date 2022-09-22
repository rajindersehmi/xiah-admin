import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBrand from "./add-brand";
import BrandList from "./brand-list";
import EditBrand from "./edit-brand";

const Brands = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-brand`} component={AddBrand} />
      <Route path={`${match.url}/edit-brand/:id`} component={EditBrand} />
      <Route path={`${match.url}/list`} component={BrandList} />
    </Switch>
  );
};

export default Brands;
