import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddListing from "./add-listing";
import BusinessListingList from "./business-list";
import EditListing from "./edit-listing";

const Brands = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-listing`} component={AddListing} />
      <Route path={`${match.url}/edit-listing/:id`} component={EditListing} />
      <Route path={`${match.url}/list`} component={BusinessListingList} />
    </Switch>
  );
};

export default Brands;
