import React from "react";
import PageForm from "../PageForm";

const EditPage = (props) => {
  return <PageForm mode="EDIT" param={props.match.params} />;
};

export default EditPage;
