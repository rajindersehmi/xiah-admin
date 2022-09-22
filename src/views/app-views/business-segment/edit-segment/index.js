import React from "react";
import SegmentForm from "../SegmentForm";

const EditProduct = (props) => {
  return <SegmentForm mode="EDIT" param={props.match.params} />;
};

export default EditProduct;
