import React from "react";
import NotificationsForm from "../NotificationsForm";

const EditNotifications = (props) => {
  return <NotificationsForm mode="EDIT" param={props.match.params} />;
};

export default EditNotifications;
