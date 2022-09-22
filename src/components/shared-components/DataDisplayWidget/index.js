import { Avatar, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CustomStatistic from "../CustomStatistic";
import Flex from "../Flex";

const DataDisplayWidget = (props) => {
  const { size, value, title, link, icon, color, avatarSize, vertical } = props;
  const customStatisticProps = { size, value, title };
  return (
    <Link to={link ?? "#"}>
      <Card>
        <Flex alignItems="center" flexDirection={vertical ? "column" : "row"}>
          <Avatar
            size={avatarSize}
            shape="square"
            icon={icon}
            className={`ant-avatar-${color}`}
          />
          <div className={vertical ? "mt-3 text-center" : "ml-3"}>
            <CustomStatistic {...customStatisticProps} />
          </div>
        </Flex>
      </Card>
    </Link>
  );
};

DataDisplayWidget.defaultProps = {
  avatarSize: 50,
  vertical: false,
};

export default DataDisplayWidget;
