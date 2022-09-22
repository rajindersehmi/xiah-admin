import React from "react";
import TagForm from "../tagForm";

const EditTag = (props) => {
  return <TagForm mode="EDIT" param={props.match.params} />;
};

export default EditTag;
