import { Card, Tabs } from "antd";
import React from "react";
import List from "./List";

export const enquiryTypes = [
  {
    key: "1",
    label: "Listing",
    value: "listing",
  },
  {
    key: "2",
    label: "Static",
    value: "static",
  },
];

const PlanList = () => {
  return (
    <>
      <Card>
        <Tabs defaultActiveKey="1">
          {enquiryTypes.map((type) => (
            <Tabs.TabPane tab={type.label} key={type.key}>
              <List pageType={type.value} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};

export default PlanList;
