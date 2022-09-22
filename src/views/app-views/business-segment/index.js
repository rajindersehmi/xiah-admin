import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SegmentList from "./segment-list";
import AddSegment from "./add-segment";
import EditSegment from "./edit-segment";

const BusinessSegment = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.url}/list`} component={SegmentList} />
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-segment`} component={AddSegment} />
      <Route path={`${match.url}/edit-segment/:id`} component={EditSegment} />
    </Switch>
  );
};

export default BusinessSegment;
