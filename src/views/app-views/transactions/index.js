import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TransactionList from "./transaction-list";

const Transactions = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={TransactionList} />
    </Switch>
  );
};

export default Transactions;
