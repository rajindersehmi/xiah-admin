import moment from "moment";
import React from "react";

const RetrieveDate = ({ date }) => {
  return <span>{moment(date).format("DD MMM YYYY")} </span>;
};

export default RetrieveDate;
