import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";

import UserService from "services/User";
import utils from "utils";
import { CustomDatePicker } from "./OtherFields";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  biding: [
    {
      required: true,
      message: "Please fill this field",
    },

    {
      pattern: new RegExp("^[0-9]*$"),
      message: "Please enter valid number",
    },
  ],
};

const GeneralField = (props) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await UserService.list({
        partner_verified: "1",
        user_type: "partner",
      });
      if (res) setProviders(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const statuses = ["review", "pending", "completed", "failed", "cancelled"];
  const markForBiding = ["yes", "no", "purchased"];
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item name="remarks" label="Remark">
                <Input placeholder="Remark" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Raised from where" name="raised_from_where">
                <Input placeholder="Rasised from where" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Status" name="status">
                <Select placeholder="Select Status">
                  {statuses.map((type) => (
                    <Option value={type} key={type}>
                      {utils.humanize(type)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Next Update"
                name="next_possible_update"
                // rules={rules.required}
                // placeplaceholder="select date"
              >
                <CustomDatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Expire on" name="expiry_on">
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Customer"
                name="customer_id"
                rules={rules.required}
              >
                <Select placeholder="Select Customer">
                  {users.map((user) => (
                    <Option value={user.id}>
                      {`${user.first_name} ${user.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Provider" name="provider_id">
                <Select placeholder="Select Provider">
                  {providers.map((provider) => (
                    <Option value={provider.id} key={provider.id}>
                      {provider.first_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="sale_type" label="Sale type">
                <Input placeholder="Enter Sale type" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="sale_grade" label="Sale Grade">
                <Input placeholder="Enter Sale grade" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="sale_urgency" label="Sale Urgency">
                <Input placeholder="Enter Sale urgency" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12}>
              <Form.Item label="Last remark by" name="last_remark_by_id">
                <Input placeholder="Last remark by" />
              </Form.Item>
            </Col> */}
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Other Info">
          <Form.Item label="Mark for biding" name="mark_for_bidding">
            <Select placeholder="Mark for biding">
              {markForBiding.map((type) => (
                <Option value={type} key={type}>
                  {utils.humanize(type)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Biding Price" name="bidding_price">
            <Input className="w-100" />
          </Form.Item>

          <Form.Item label="Contract Value" name="cv">
            <Input className="w-100" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
