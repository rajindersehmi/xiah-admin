import { Card, Col, Form, Input, Row } from "antd";
import React from "react";

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field!",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            name="redirect_from"
            label="Redirect From"
            rules={rules.required}
          >
            <Input placeholder="Redirect From" />
          </Form.Item>
          <Form.Item
            name="redirect_to"
            label="Redirect To"
            rules={rules.required}
          >
            <Input placeholder="Redirect To" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
