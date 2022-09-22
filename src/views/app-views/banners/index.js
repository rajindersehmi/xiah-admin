import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBanner from "./add-banner";
import BannerList from "./banner-list";
import EditBanner from "./edit-banner";

const Banners = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-banner`} component={AddBanner} />
      <Route path={`${match.url}/edit-banner/:id`} component={EditBanner} />
      <Route path={`${match.url}/list`} component={BannerList} />
    </Switch>
  );
};

export default Banners;
