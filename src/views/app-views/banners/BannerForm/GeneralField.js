import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import SingleFileUpload from "components/shared-components/SingleFileUpload";

import React, { useState } from "react";

import utils from "utils";

const { Option } = Select;

const rules = {
  title: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  action_link: [
    {
      required: true,
      pattern: new RegExp("^http[s]?://(www.)?(.*)?/?(.)*"),

      message: "Please enter a valid url (with http/https)",
    },
  ],
  startAt: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  image: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  endAt: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  order: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  type: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  platform: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const platform = ["customer", "partner"];

const GeneralField = ({ form, ...props }) => {
  const [plat, setPlat] = useState("");

  const type =
    plat === "customer"
      ? ["audit_report", "post_requirement"]
      : ["dashboard", "profile_page"];

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="title" label="Title" rules={rules.title}>
            <Input placeholder="Banner title" />
          </Form.Item>
          {/* <Form.Item name="link" label="Link" rules={rules.link}>
            <Input placeholder="Banner link" />
          </Form.Item> */}
          <Form.Item
            name="action_link"
            label="Action Link"
            rules={rules.action_link}
          >
            <Input placeholder="Action Link" />
          </Form.Item>
          <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="start_at" label="Start at" rules={rules.startAt}>
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="end_at" label="End at" rules={rules.endAt}>
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="image" label="Image" rules={rules.image}>
            <SingleFileUpload folder="banners" />
          </Form.Item>
        </Card>
        <Card title="Other info">
          <Form.Item name="platform" label="Platform" rules={rules.platform}>
            <Select
              onChange={(e) => setPlat(e)}
              style={{ width: "100%" }}
              placeholder="Platform"
            >
              {platform.map((elm, k) => (
                <Option key={k} value={elm}>
                  {utils.humanize(elm)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Banner Type" rules={rules.type}>
            <Select style={{ width: "100%" }} placeholder="Type">
              {type.map((elm, k) => (
                <Option key={k} value={elm}>
                  {utils.humanize(elm)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="order" label={"Order"} rules={rules.order}>
            <InputNumber placeholder="Order" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
