import { Card, Tabs } from "antd";
import useRestriction from "hooks/useRestriction";
import React from "react";
import List from "./List";
import Restricted from "views/app-views/permissions/Restricted";

const LeadList = () => {
  const isRestricted = useRestriction();
  return (
    <Restricted to={"enquiry_view"}>
      <Card>
        <Tabs defaultActiveKey="1">
          {!isRestricted("service_enquiry_purchase_view") && (
            <Tabs.TabPane tab="Services" key="1">
              <List enquiry_type={"category"} />
            </Tabs.TabPane>
          )}
          {!isRestricted("extra_service_enquiry_purchase_view") && (
            <Tabs.TabPane tab="Extra Service" key="3">
              <List enquiry_type={"extra_services"} />
            </Tabs.TabPane>
          )}
        </Tabs>
      </Card>
    </Restricted>
  );
};

export default LeadList;
