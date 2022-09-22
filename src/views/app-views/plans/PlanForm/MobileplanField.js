import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Row, Select, Button } from "antd";
import Flex from "components/shared-components/Flex";
import React from "react";
import Utils from "utils";
import { speedUnit } from "./BroadbandplanField";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const MobilePlanFields = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Mobile">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                name="contract"
                label="Contract Period"
                rules={rules.required}
              >
                <Input
                  placeholder="Contract"
                  value={props.contractNo}
                  onChange={(e) => props.setContractNo(e.target.value)}
                  addonAfter={
                    <Form.Item name={"contract_period_suffix"} noStyle>
                      <Select
                        defaultValue="days "
                        value={props.contractUnit}
                        onChange={(e) => props.setContractUnit(e)}
                        className="select-after"
                      >
                        <Option value="days">days</Option>
                        <Option value="weeks">weeks</Option>
                        <Option value="months">months</Option>
                        <Option value="years">years</Option>
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="speed" label="Speed">
                <Input
                  addonAfter={
                    <Form.Item name="speed_suffix" noStyle>
                      <Select style={{ minWidth: 70 }}>
                        {speedUnit.map((unit) => (
                          <Option key={unit} value={unit}>
                            {Utils.humanize(unit)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="data" label="Data">
                <Input placeholder="Data" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="minutes" label="Minutes">
                <Input placeholder="Minutes" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="texts" label="Texts">
                <Input placeholder="Texts" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="network_type" label="Network type">
                <Input placeholder="Network type" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="roaming" label="Roaming">
                <Input placeholder="Roaming" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="coverage" label="Coverage">
                <Input placeholder="Coverage" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.List
                name="multiple_color_add"
                label="Multiple colors"
                rules={rules.required}
              >
                {(fields, { add, remove }) => (
                  <>
                    <Row gutter={16}>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Col xs={24} md={6} key={key}>
                          <p>Color {index + 1}</p>
                          <Flex className="w-100 mb-4 align-items-center">
                            <Form.Item
                              noStyle
                              label={`Color ${index + 1}`}
                              {...restField}
                              name={name}
                              rules={rules.required}
                            >
                              <Input type="color" className="w-100" />
                            </Form.Item>

                            <MinusCircleOutlined
                              className="ml-2"
                              onClick={() => remove(name)}
                            />
                          </Flex>
                        </Col>
                      ))}
                    </Row>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Color
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="network_list" label="Network list">
                <Input.TextArea placeholder="Network list" />
              </Form.Item>
              <Form.Item
                name="handset_image"
                label="Image"
                rules={rules.required}
              >
                <SingleFileUpload folder="plan" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MobilePlanFields;
