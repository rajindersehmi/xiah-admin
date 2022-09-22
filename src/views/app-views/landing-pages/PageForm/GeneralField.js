import { Card, Col, Form, Input, Row } from "antd";
import SeoForm from "components/shared-components/SeoForm";
import TextEditor from "components/shared-components/TextEditor";
import React from "react";
import Url from "../../../../components/shared-components/Url";

const rules = {
  title: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  description: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={16}>
      <Card title="Basic Info">
        <Form.Item name="title" label="Page title" rules={rules.title}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={rules.description}
        >
          <TextEditor />
        </Form.Item>
        <Url placeholder="Url" />
      </Card>
      <SeoForm
        note={`Add {city} for dynamic city name in seo title, description and keywords`}
      />
    </Col>
    <Col xs={24} sm={24} md={8}>
      {[1, 2, 3, 4].map((number) => (
        <PackCard number={number} />
      ))}
    </Col>
  </Row>
);

const PackCard = ({ number }) => (
  <Card title={`Pack ${number}`}>
    <Form.Item name={`pack${number}title`} label="Title">
      <Input placeholder="Title" />
    </Form.Item>
    <Form.Item name={`pack${number}price`} label="Price">
      <Input placeholder="Price" />
    </Form.Item>
    <Form.Item name={`pack${number}description`} label="Description">
      <Input.TextArea placeholder="Description" />
    </Form.Item>
    <Form.Item name={`pack${number}features`} label="Features">
      <Input.TextArea placeholder="Featues" />
    </Form.Item>
  </Card>
);

export default GeneralField;
