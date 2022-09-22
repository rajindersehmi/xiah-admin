import { Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import SeoForm from "components/shared-components/SeoForm";
import TextEditor from "components/shared-components/TextEditor";
import React from "react";
import Url from "../../../../components/shared-components/Url";

const { Option } = Select;

const footerCategories = [
  "Solutions",
  "Product",
  "Features",
  "Resources",
  "Company",
];

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="title" label="Page title" rules={rules.required}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={rules.required}
        >
          <TextArea />
        </Form.Item>
        <Url placeholder="Url" />
        <Form.Item name="content" label="Content" rules={rules.required}>
          <TextEditor />
        </Form.Item>
      </Card>
      <SeoForm />
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Other Details">
        <Form.Item name="published" valuePropName="checked">
          <Checkbox>Is Published ?</Checkbox>
        </Form.Item>
        <Form.Item name="footer_category" label="Footer Heading">
          <Select placeholder="Select footer heading">
            <Option value={"null"}>None</Option>
            {footerCategories.map((c) => (
              <Option value={c} key={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
