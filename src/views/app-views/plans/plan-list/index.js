import { Card, Tabs } from "antd";
import React from "react";
import List from "./List";

export const enquiryTypes = [
  {
    key: "1",
    label: "Live Plans",
    value: 0,
  },
  {
    key: "2",
    label: "Expired",
    value: 1,
  },
];

const PlanList = () => {
  return (
    <>
      <Card>
        <Tabs defaultActiveKey="1">
          {enquiryTypes.map((type) => (
            <Tabs.TabPane tab={type.label} key={type.key}>
              <List expired={type.value} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};

export default PlanList;
