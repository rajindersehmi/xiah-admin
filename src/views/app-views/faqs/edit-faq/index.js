import React from "react";
import FaqForm from "../FaqForm";

const EditProduct = (props) => {
  return <FaqForm mode="EDIT" param={props.match.params} />;
};

export default EditProduct;
