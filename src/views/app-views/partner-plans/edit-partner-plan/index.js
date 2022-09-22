import React from "react";
import PartnerPlanForm from "../PartnerPlanForm";

const EditPartnerPlan = (props) => {
  return <PartnerPlanForm mode="EDIT" param={props.match.params} />;
};

export default EditPartnerPlan;
