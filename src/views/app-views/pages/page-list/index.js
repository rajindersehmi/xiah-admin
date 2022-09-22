import { Card, Tabs } from "antd";
import List from "./List";
import React from "react";

const Pages = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={"Published"} key={1}>
          <List published={1} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Draft"} key={2}>
          <List published={0} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Pages;
