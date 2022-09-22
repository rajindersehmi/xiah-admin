import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import Utils from "utils";
import { speedUnit } from "./BroadbandplanField";
const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please enter data",
    },
  ],
};

const InternationalSimPlanFields = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Internatinal Plan Fields">
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
                            {Utils.humanize(unit)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="incoming_calls" label="Incoming Calls">
                <Input placeholder="Incoming calls" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="local_calls" label="Local calls">
                <Input placeholder="Local calls" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="international_calls" label="International calls">
                <Input placeholder="International calls" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="data_benefit" label="Data Benefit">
                <Input placeholder="Data benefits" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="network_type" label="Network type">
                <Input placeholder="Network type" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="region" label="region">
                <Input placeholder="Region" className="w-100" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="texts" label="Texts" rules={rules.required}>
                <Input placeholder="Texts" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item name="contract_type" label="Contract type">
                <Select>
                  <Option value="Contract SIM">Contract SIM</Option>
                  <Option value="Period">Period</Option>
                  <Option value="Pay as you go SIM">Pay as you go SIM</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default InternationalSimPlanFields;
