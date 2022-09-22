import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PartnerPlanList from "./partner-plan-list";
import AddPartnerPlan from "./add-partner-plan";
import EditPartnerPlan from "./edit-partner-plan";

const PartnerPlan = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/add-partner-plan`}
        component={AddPartnerPlan}
      />
      <Route
        path={`${match.url}/edit-partner-plan/:id`}
        component={EditPartnerPlan}
      />
      <Route path={`${match.url}/list`} component={PartnerPlanList} />
    </Switch>
  );
};

export default PartnerPlan;
