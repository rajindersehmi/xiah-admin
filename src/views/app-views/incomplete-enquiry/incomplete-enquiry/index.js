import { Card, Tabs } from "antd";
import useRestriction from "hooks/useRestriction";
import React from "react";
import List from "./List";
import Restricted from "../../permissions/Restricted";

const IncompleteEnquiry = () => {
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
            <Tabs.TabPane tab="Audit Report" key="2">
              <List enquiry_type={"audit_report"} />
            </Tabs.TabPane>
          )}
          {!isRestricted("extra_service_enquiry_purchase_view") && (
            <Tabs.TabPane tab="Post Requirement" key="3">
              <List enquiry_type={"requirement"} />
            </Tabs.TabPane>
          )}
        </Tabs>
      </Card>
    </Restricted>
  );
};

export default IncompleteEnquiry;
