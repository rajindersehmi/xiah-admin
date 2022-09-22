import { Card, Tabs } from "antd";
import useRestriction from "hooks/useRestriction";
import React from "react";

import List from "./List";
import Restricted from "views/app-views/permissions/Restricted";

export const enquiryTypes = [
  {
    key: "1",
    label: "Service",
    value: "category",
    permission: "service_enquiry_view",
  },
  {
    key: "2",
    label: "Requirements",
    value: "requirement",
    permission: "requirement_enquiry_view",
  },
  {
    key: "3",
    label: "Audit Report",
    value: "audit_report",
    permission: "audit_report_enquiry_view",
  },
  {
    key: "4",
    label: "Plans",
    value: "plan_purchase",
    permission: "plans_enquiry_view",
  },
  {
    key: "5",
    label: "Extra services",
    value: "extra_services",
    permission: "extra_service_enquiry_view",
  },
  {
    key: "6",
    label: "Business",
    value: "business",
    permission: "business_enquiry_view",
  },
];

const LeadList = () => {
  const isRestricted = useRestriction();
  return (
    <Restricted to={"enquiry_view"}>
      <Card>
        <Tabs defaultActiveKey="1">
          {enquiryTypes.map(
            (type) =>
              !isRestricted(type.permission) && (
                <Tabs.TabPane tab={type.label} key={type.key}>
                  <List enquiry_type={type.value} />
                </Tabs.TabPane>
              )
          )}
        </Tabs>
      </Card>
    </Restricted>
  );
};

export default LeadList;
