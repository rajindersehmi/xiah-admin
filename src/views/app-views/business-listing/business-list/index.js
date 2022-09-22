import { Card, Tabs } from "antd";
import React from "react";
import ClaimListing from "./ClaimListing";
import List from "./List";
import PartnerListing from "./PartnerListing";

const BusinessListing = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={"Verified"} key={"1"}>
          <List mode="all" />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Under Review"} key={"2"}>
          <PartnerListing />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Claims"} key={"3"}>
          <ClaimListing />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default BusinessListing;
