import { Card, Col, Form, Input, Row, Select, TimePicker } from "antd";
import React from "react";
import Utils from "utils";
import { speedUnit } from "./BroadbandplanField";
const { Option } = Select;

const rules = {
  network: [
    {
      required: true,
      message: "Please enter blog url",
    },
  ],
  data: [
    {
      required: true,
      message: "Please enter data",
    },
  ],
  required: [
    {
      required: true,
      message: "Plase fill this field",
    },
  ],
  minutes: [
    {
      required: true,
      message: "Please enter blog content",
    },
  ],
};

const SatelliteBroadbandFields = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Satellite broadband">
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
              <Form.Item
                name="upload_speed"
                label="Upload Speed"
                rules={rules.required}
              >
                <Input
                  addonAfter={
                    <Form.Item
                      name="upload_speed_suffix"
                      noStyle
                      rules={rules.required}
                    >
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
              <Form.Item
                name="download_speed"
                label="Download Speed"
                rules={rules.required}
              >
                <Input
                  addonAfter={
                    <Form.Item
                      name="download_speed_suffix"
                      noStyle
                      rules={rules.required}
                    >
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
              <Form.Item
                name="night_time_free_usage_period"
                label="Night time free usage period"
              >
                <TimePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item
                name="usage_type"
                label="Usage type"
                rules={rules.required}
              >
                <Input placeholder="usage type" className="w-100" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item
                name="data_benefit"
                label="Data Benefit"
                rules={rules.required}
              >
                <Input placeholder="Data benefits" className="w-100" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SatelliteBroadbandFields;
