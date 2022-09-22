import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import Flex from "components/shared-components/Flex";
import React from "react";
import utils from "utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SingleFileUpload from "components/shared-components/SingleFileUpload";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "This field is required",
    },
  ],
};
export const speedUnit = ["kbps", "mbps", "gbps"];
const dataUsageUnit = ["mb", "gb", "unlimited"];

const BroadbandPhone = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Broadband + Phone plans">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="contract" label="Contract Period">
                <Input
                  placeholder="Contract"
                  value={props.contractNo}
                  onChange={(e) => props.setContractNo(e.target.value)}
                  addonAfter={
                    <Form.Item name={"contract_period_suffix"} noStyle>
                      <Select
                        defaultValue="days"
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
              <Form.Item name="speed" label="Speed" rules={rules.required}>
                <Input
                  addonAfter={
                    <Form.Item name="speed_suffix" noStyle>
                      <Select style={{ minWidth: 70 }}>
                        {speedUnit.map((unit) => (
                          <Option key={unit} value={unit}>
                            {utils.humanize(unit)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="usage" label="Usage" rules={rules.required}>
                <Input
                  addonAfter={
                    <Form.Item name="usage_suffix" noStyle>
                      <Select style={{ minWidth: 70 }}>
                        {dataUsageUnit.map((unit) => (
                          <Option key={unit} value={unit}>
                            {utils.humanize(unit)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                name="speed_after_usage"
                label="Speed after usage"
                rules={rules.required}
              >
                <Input
                  addonAfter={
                    <Form.Item name="speed_after_usage_suffix" noStyle>
                      <Select style={{ minWidth: 70 }}>
                        {speedUnit.map((unit) => (
                          <Option key={unit} value={unit}>
                            {utils.humanize(unit)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="bundled_calls" label="Bundled calls">
                <Select>
                  <Option value="Weekends">Weekends</Option>
                  <Option value="Anytime">Anytime</Option>
                  <Option value="Evenings ">Evenings</Option>
                  <Option value="None">None</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="package" label="Package">
                <Input placeholder="Package" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="package_included" label="Package Included">
                <Input placeholder="Package included" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="subscription_pack" label="Subscription pack">
                <Input placeholder="Subscription pack" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={6}>
              <Form.Item name="network_type" label="Network type">
                <Input placeholder="Network type" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="data_benefit" label="Data benefit">
                <Input placeholder="Data benefit" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="free_calls" label="Free Calls">
                <Input placeholder="Free calls" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="overage" label="Overage">
                <Input placeholder="Overage" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={6}>
              <Form.Item name="pack_speed" label="Pack speed">
                <Input placeholder="Pack speed" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="payment_speed" label="Broadband type">
                <Select>
                  <Option value={"Fiber Broadband"}>Fiber Broadband</Option>
                  <Option value={"Standard Broadband"}>
                    Standard Broadband
                  </Option>
                  <Option value={"Bonded Broadband"}>Bonded Broadband</Option>
                </Select>
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

export default BroadbandPhone;
