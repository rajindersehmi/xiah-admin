import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import utils from "utils";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};
export const speedUnit = ["kbps", "mbps", "gbps"];
const dataUsageUnit = ["mb", "gb", "unlimited"];

const BroadbandPlanFields = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Broadband plans">
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
              <Form.Item name="recorder" label="Recorder">
                <Input placeholder="Recorder" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="spec" label="Spec">
                <Input placeholder="Spec" />
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
              <Form.Item name="device" label="Device">
                <Input placeholder="Device" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="storage" label="Storage">
                <Input placeholder="Storage" />
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
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default BroadbandPlanFields;
