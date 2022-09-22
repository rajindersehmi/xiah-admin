import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddCategory from "./add-category";
import CategoryList from "./category-list/List";
import EditCategory from "./edit-category";

const Category = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.url}/list`} component={CategoryList} />
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-category`} component={AddCategory} />
      <Route path={`${match.url}/edit-category/:id`} component={EditCategory} />
    </Switch>
  );
};

export default Category;
