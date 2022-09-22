import React from "react";
import ExtraServiceForm from "../ExtraServiceForm";

const EditExtraService = (props) => {
  return <ExtraServiceForm mode="EDIT" param={props.match.params} />;
};

export default EditExtraService;
