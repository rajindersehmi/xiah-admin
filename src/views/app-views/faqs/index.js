import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddFaq from "./add-faq";
import EditFaq from "./edit-faq";
import FaqList from "./faq-list";

const Blogs = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-faq`} component={AddFaq} />
      <Route path={`${match.url}/edit-faq/:id`} component={EditFaq} />
      <Route path={`${match.url}/list`} component={FaqList} />
    </Switch>
  );
};

export default Blogs;
