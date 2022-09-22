import { Card, Col, Form, Input, Row } from "antd";

import SingleFileUpload from "components/shared-components/SingleFileUpload";

import React from "react";

const rules = {
  title: [
    {
      required: true,
      message: "Please enter title",
    },
  ],
  image: [
    {
      required: true,
      message: "Please add image",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.title}>
            <Input placeholder="name" />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="image" label="Image" rules={rules.image}>
            <SingleFileUpload folder="tags" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
