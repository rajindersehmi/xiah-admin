import { Card, Col, Form, Input, Row, Select } from "antd";

import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SeoForm from "components/shared-components/SeoForm";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";
import Url from "../../../../components/shared-components/Url";

import React from "react";
import utils from "utils";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  content: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  parentCategory: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const checkboxes = {
  active: "1",
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.required}
          >
            <TextEditor />
          </Form.Item>
          <Url placeholder="Category Url" />
          <Form.Item name="content" label="Content" rules={rules.content}>
            <TextEditor />
          </Form.Item>
        </Card>
        <SeoForm />
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="logo" label="Logo" rules={rules.required}>
            <SingleFileUpload folder="category" />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={rules.required}>
            <SingleFileUpload folder="category" />
          </Form.Item>
          {Object.entries(checkboxes).map((checkbox) => (
            <Form.Item
              key={checkbox[0]}
              name={checkbox[0]}
              valuePropName="checked"
            >
              <CustomCheckbox>{utils.humanize(checkbox[0])}</CustomCheckbox>
            </Form.Item>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
