import React from "react";
import ListingForm from "../ListingForm";

const EditListing = (props) => {
  return <ListingForm mode="EDIT" param={props.match.params} />;
};

export default EditListing;
