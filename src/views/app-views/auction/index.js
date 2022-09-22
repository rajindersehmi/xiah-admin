import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuctionList from "./auction-list";

const Enquiries = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={AuctionList} />
    </Switch>
  );
};

export default Enquiries;
