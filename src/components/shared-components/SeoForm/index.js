import { Card, Form, Input, Select, Button, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
const { Option } = Select;
const types = ["Article", "Category", "Page"];
const rules = {
  meta_title: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  meta_description: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  keywords: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const SeoForm = ({ note }) => (
  <Card title="SEO Form">
    {note && (
      <p>
        <span className="font-weight-bold">Note</span>: {note}
      </p>
    )}
    <Form.Item name="meta_title" label="Title" rules={rules.meta_title}>
      <Input placeholder="Meta title" />
    </Form.Item>
    <Form.Item
      name="meta_description"
      label="Meta Description"
      rules={rules.meta_description}
    >
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.List name="keywords" rules={rules.keywords}>
      {(fields, { add, remove }, { errors }) => (
        <>
          <Row gutter={16}>
            {fields.map((field, index) => (
              <Col xs={24} md={6}>
                <Form.Item
                  required={true}
                  key={field.key}
                  label={`Keyword ${index + 1}`}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please fill this field",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tag" style={{ width: "80%" }} />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button ml-1"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Form.Item
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please fill this field",
              },
            ]}
          >
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add Keyword
            </Button>
          </Form.Item>
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
    <Form.Item
      name="author"
      label="Author"
      rules={[
        {
          required: true,
          whitespace: true,
          message: "Please fill this field",
        },
      ]}
    >
      <Input placeholder="Author" />
    </Form.Item>
    <Form.Item
      name="type"
      label="Type"
      rules={[
        {
          required: true,
          whitespace: true,
          message: "Please fill this field",
        },
      ]}
    >
      <Select className="" placeholder="Type">
        {types.map((elm, k) => (
          <Option key={k} value={elm}>
            {elm}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item name="conical_tag" label="Conical Tag">
      <Input placeholder="Conical tag" />
    </Form.Item>
  </Card>
);

export default SeoForm;
