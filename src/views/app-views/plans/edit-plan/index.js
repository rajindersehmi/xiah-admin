import React from "react";
import PlansForm from "../PlanForm";

const EditPlan = (props) => {
  return <PlansForm mode="EDIT" param={props.match.params} />;
};

export default EditPlan;
