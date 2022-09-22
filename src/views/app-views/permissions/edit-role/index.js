import React from "react";
import RoleForm from "../RoleForm";

const EditRole = (props) => {
  return <RoleForm mode="EDIT" param={props.match.params} />;
};

export default EditRole;
