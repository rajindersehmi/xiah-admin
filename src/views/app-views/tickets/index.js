import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddTicket from "./add-ticket";
import EditTicket from "./edit-ticket";
import Messages from "./messages";
import TicketList from "./tickets-list";

const Banners = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add-ticket`} component={AddTicket} />
      <Route path={`${match.url}/edit-ticket/:id`} component={EditTicket} />
      <Route path={`${match.url}/messages/:id`} component={Messages} />
      <Route path={`${match.url}/list`} component={TicketList} />
    </Switch>
  );
};

export default Banners;
