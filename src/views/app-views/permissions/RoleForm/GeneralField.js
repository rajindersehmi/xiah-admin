import { Card, Checkbox, Col, Form, Input, Row } from "antd";

import React from "react";

const rules = {
  title: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  url: [
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
  categ: [{ required: true, message: "Please fill this field" }],
  blog_categ: [{ required: true, message: "Please fill this field" }],
  seo_id: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card>
          <Form.Item name="role" label="Role" rules={rules.title}>
            <Input placeholder="Role" disabled={true} />
          </Form.Item>
          <Form.Item name="permissions" label="Permissions">
            <Checkbox.Group>
              <Row>
                {props.permissions.map((p) => (
                  <Col xs={24} md={6} key={`perm ${p.id}`}>
                    <Checkbox value={p.name} style={{ lineHeight: "32px" }}>
                      {p.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
