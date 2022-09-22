import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddCity from "./add-city";
import CityList from "./city-list";
import EditCity from "./edit-city";

const Cities = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-city`} component={AddCity} />
      <Route path={`${match.url}/edit-city/:id`} component={EditCity} />
      <Route path={`${match.url}/list`} component={CityList} />
    </Switch>
  );
};

export default Cities;
