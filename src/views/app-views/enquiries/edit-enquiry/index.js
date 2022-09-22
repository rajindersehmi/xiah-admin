import React from "react";
import EnquiryForm from "../EnquiryForm";

const EditEnquiry = (props) => {
  return <EnquiryForm mode="EDIT" param={props.match.params} />;
};

export default EditEnquiry;
