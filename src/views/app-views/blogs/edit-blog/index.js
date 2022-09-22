import React from "react";
import BlogForm from "../BlogForm";

const EditProduct = (props) => {
  return <BlogForm mode="EDIT" param={props.match.params} />;
};

export default EditProduct;
