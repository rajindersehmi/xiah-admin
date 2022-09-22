import React from "react";
import AwardForm from "../AwardForm";

const EditAward = (props) => {
  return <AwardForm mode="EDIT" param={props.match.params} />;
};

export default EditAward;
