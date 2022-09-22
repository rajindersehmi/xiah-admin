import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
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
        <Card title="TV plans">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="contract"
                label="Contract Period"
                required="True"
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
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_tv_channels"
                label="Total TV channels"
                rules={rules.required}
              >
                <Input placeholder="Total TV channels" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_hd_tv_channels"
                label=" Total HD channels"
                rules={rules.required}
              >
                <Input placeholder="Total HD channels" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_sd_channels"
                label="Total SD channels"
                rules={rules.required}
              >
                <Input placeholder="Total SD channels" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="audio_quality"
                label="Audio quality"
                rules={rules.required}
              >
                <Input placeholder="Audio quality" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="box_type"
                label="Box Type"
                rules={rules.required}
              >
                <Input placeholder="Box" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="picture_quality"
                label="Picture Quality"
                rules={rules.picture}
              >
                <Input placeholder="Picture Quality" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="channels_list"
                label="Channel list"
                rules={rules.required}
              >
                <Input.TextArea placeholder="Channel list( seprate each channel name with commas)" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MobilePlanFields;
