import { Card, Col, Form, Input, message, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import React, { useEffect, useState } from "react";
import EnquiryService from "services/Enquiry";
import UserService from "services/User";
import utils from "utils";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please enter this field",
    },
  ],
};

const related_to = [
  "Payment related",
  "Order related",
  "Provider related",
  "Other",
];

const enquiryTypes = [
  {
    id: "category",
    label: "Service",
  },
  {
    id: "audit_report",
    label: "Audit",
  },
  {
    id: "requirement",
    label: "Requirement",
  },
  {
    id: "extra_services",
    label: "Extra Services",
  },
];

const GeneralField = ({ mode, imageSrc, form }) => {
  const [ticketType, setTicketType] = useState(null);
  const [enquiryData, setEnquiryData] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [ticketType]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await EnquiryService.list({ enquiry_type: ticketType });
      if (res) {
        setEnquiryData(res?.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await UserService.list();
      if (res) {
        setUsers(res?.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={10}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="title" label="Title" rules={rules.required}>
                <Input placeholder="Banner title" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="related_to"
                label="Related To"
                rules={rules.required}
              >
                <Select style={{ width: "100%" }} placeholder="Related To">
                  {related_to.map((elm, k) => (
                    <Option key={k} value={elm}>
                      {utils.humanize(elm)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="ticket_type"
                label="Ticket Type"
                rules={rules.required}
              >
                <TicketType setTicketType={setTicketType} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="ticket_type_id"
                label="Enquiry ID"
                dependencies={["ticket_type"]}
                rules={rules.required}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Enquiry ID"
                  disabled={ticketType == null}
                >
                  {ticketType !== null &&
                    enquiryData?.map((elm, k) => (
                      <Option key={k} value={elm.id}>
                        {utils.humanize(elm.reference_id)}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="user_id" label="User" rules={rules.required}>
                <Select style={{ width: "100%" }} placeholder="Enquiry ID">
                  {users?.map((user, k) => (
                    <Option key={k} value={user.id}>
                      {user?.email ??
                        `${user?.first_name} ${user?.last_name}` ??
                        user?.phone ??
                        user.id ??
                        "No user"}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Decription">
            <TextArea placeholder="Enter description of the issue" />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name={"images"}>
            <SingleFileUpload folder="tickets" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

const TicketType = (props) => {
  const handleChange = (value) => {
    props.onChange(value);
    props.setTicketType(value);
  };

  return (
    <Select
      {...props}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder="Ticket Type"
    >
      {enquiryTypes.map((elm, k) => (
        <Option key={k} value={elm.id}>
          {utils.humanize(elm.label)}
        </Option>
      ))}
    </Select>
  );
};

export default GeneralField;
