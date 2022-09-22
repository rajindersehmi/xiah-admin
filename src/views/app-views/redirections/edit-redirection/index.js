import React from "react";
import RedirectionForm from "../RedirectionForm";

const EditRedirection = (props) => {
  return <RedirectionForm mode="EDIT" param={props.match.params} />;
};

export default EditRedirection;
