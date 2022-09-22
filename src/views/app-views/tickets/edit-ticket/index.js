import React from "react";
import TicketForm from "../TicketForm";

const EditTicket = (props) => {
  return <TicketForm mode="EDIT" param={props.match.params} />;
};

export default EditTicket;
