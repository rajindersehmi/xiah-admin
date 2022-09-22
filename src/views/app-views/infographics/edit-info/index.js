import React from "react";
import InfograhicsForm from "../InfograhicsForm";

const EditInfo = (props) => {
  return <InfograhicsForm mode="EDIT" param={props.match.params} />;
};

export default EditInfo;
