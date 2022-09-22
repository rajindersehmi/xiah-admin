import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddEnquiry from "./add-enquiry";
import EditEnquiry from "./edit-enquiry";
import EnquiryList from "./enquiry-list";

const Enquiries = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-enquiry`} component={AddEnquiry} />
      <Route path={`${match.url}/edit-enquiry/:id`} component={EditEnquiry} />
      <Route path={`${match.url}/list`} component={EnquiryList} />
    </Switch>
  );
};

export default Enquiries;
