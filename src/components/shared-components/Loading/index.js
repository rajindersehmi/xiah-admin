import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

const Icon = <LoadingOutlined spin />;

const Loading = (props) => {
  const { align, cover } = props;
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} size={props.size} />
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  cover: PropTypes.string,
};

Loading.defaultProps = {
  align: "center",
  cover: "inline",
  size: "default",
};

export default Loading;
