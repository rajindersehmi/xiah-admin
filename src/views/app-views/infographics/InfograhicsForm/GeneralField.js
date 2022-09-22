import { Card, Col, Form, Input, Row, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import SeoForm from "components/shared-components/SeoForm";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";
import Url from "../../../../components/shared-components/Url";
import React from "react";

const rules = {
  link: [
    {
      pattern: new RegExp("^(https?)(://|(%3A%2F%2F))"),
      message: "please enter a valid Link",
    },

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
};

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="title" label="Title" rules={rules.required}>
          <Input placeholder="Infograhpic title" />
        </Form.Item>

        <Url placeholder="Infograhic url" />
        <Form.Item name="image_alt" label="Alt text" rules={rules.required}>
          <Input placeholder="Alt text" />
        </Form.Item>
        <Form.Item name="link" label="Btn Link" rules={rules.link}>
          <Input placeholder="Btn Link" />
        </Form.Item>
        <Form.Item name="description" label="Context" rules={rules.required}>
          <TextEditor />
        </Form.Item>
        <Form.List name="tags" rules={rules.required}>
          {(fields, { add, remove }, { errors }) => (
            <>
              <Row gutter={16}>
                {fields.map((field, index) => (
                  <Col xs={24} md={6}>
                    <Form.Item
                      required={true}
                      key={field.key}
                      label={`Tag ${index + 1}`}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={rules.required}
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
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Tag
                </Button>
              </Form.Item>
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
      </Card>
      <SeoForm />
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Form.Item name="image" label="Image" rules={rules.required}>
          <SingleFileUpload folder="infographic" />
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
