import { Card, Col, Form, Input, Row } from "antd";

import TextEditor from "components/shared-components/TextEditor";

import React from "react";

const rules = {
  required: [
    {
      required: true,
      message: "Please enter Title",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <Row gutter={12}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="title" label="Title" rules={rules.required}>
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="sub_heading"
                label="Sub Heading"
                rules={rules.required}
              >
                <Input placeholder="Sub Heading" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="link_title"
                label="Link Title"
                rules={rules.required}
              >
                <Input placeholder="Link Title" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="url" label="URL" rules={rules.required}>
                <Input placeholder="URL Slug" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.required}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="sub_description"
            label="Sub Description"
            rules={rules.required}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item name="content" label="Content">
            <TextEditor />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
