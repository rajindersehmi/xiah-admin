import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row } from "antd";

import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SingleFileUpload from "components/shared-components/SingleFileUpload";

import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import React from "react";

const rules = {
  title: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  subtitle: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  price: [
    {
      required: true,
      message: "Please fill this field",
    },
    {
      pattern: new RegExp("[0-9]"),
      message: "Please enter valid number",
    },
  ],
  order: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  benfit: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="title" label="Tittle" rules={rules.title}>
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item name="subtitle" label="Sub Tittle" rules={rules.subtitle}>
            <Input placeholder="Sub title" />
          </Form.Item>
          <Form.Item name="text_label" label="Tag Text">
            <Input placeholder="Tag text" />
          </Form.Item>
          <Form.List name={"benefit"} rules={rules.benfit}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Benefits" : ""}
                    required={false}
                    key={field.key}
                  >
                    <div className="d-flex align-items-center">
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input benefit or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Benefit" />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-2"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-100"
                    icon={<PlusOutlined />}
                  >
                    Add Benfit
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="icon" label="icon">
            <SingleFileUpload folder="partner_plan" />
          </Form.Item>
        </Card>

        <Card title="Other info">
          <Form.Item name="order" label="Order" rules={rules.order}>
            <InputNumber placeholder="order" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={rules.price}>
            <Input placeholder="price" prefix={CURRENCY_SYMBOL} />
          </Form.Item>

          <Form.Item name="is_active" valuePropName="checked">
            <CustomCheckbox>Active</CustomCheckbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
