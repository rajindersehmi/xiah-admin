import { Card, Col, Form, Input, Row, Select } from "antd";

import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";

import React from "react";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const awardTypes = ["A", "B", "C"];

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Award Name" rules={rules.required}>
          <Input placeholder="Award Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={rules.required}
        >
          <TextEditor />
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Form.Item name="image" label="Image" rules={rules.required}>
          <SingleFileUpload folder="awards" />
        </Form.Item>
      </Card>
      <Card title="Other info">
        <Form.Item name="award_type" label="Award Type" rules={rules.required}>
          <Select placeholder="Select award type">
            {awardTypes.map((type) => (
              <Option value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
