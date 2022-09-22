import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddNotifications from "./add-notifications";
import NotificationsList from "./notifications-list";
import EditNotifications from "./edit-notifications";

const PushNotifications = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/add-push-notification`}
        component={AddNotifications}
      />
      <Route
        path={`${match.url}/edit-push-notification/:id`}
        component={EditNotifications}
      />
      <Route path={`${match.url}/list`} component={NotificationsList} />
    </Switch>
  );
};

export default PushNotifications;
