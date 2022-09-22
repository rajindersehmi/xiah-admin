import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
export const speedUnit = ["kbps", "mbps", "gbps"];
const dataUsageUnit = ["mb", "gb", "unlimited"];

const BroadbandTVPhoneMobile = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Broadband + TV + Phone + Mobile plans">
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

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_tv_channels"
                label="Total TV channels"
                rules={rules.standard}
              >
                <Input placeholder="Total TV channels" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_hd_tv_channels"
                label=" Total HD channels"
                rules={rules.hd}
              >
                <Input placeholder="Total HD channels" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="total_sd_channels"
                label=" Total SD channels"
                rules={rules.standard}
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
                rules={rules.required}
              >
                <Input placeholder="Picture Quality" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="channels_list"
                label="Channel list"
                rules={rules.channel_list}
              >
                <Input.TextArea placeholder="Channel list( seprate each channel name with commas)" />
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
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Color",
                                },
                              ]}
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

export default BroadbandTVPhoneMobile;
