import { Card, Col, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SingleFileUpload from "components/shared-components/SingleFileUpload";

import React from "react";

const rules = {
  email: [
    {
      type: "email",
      message: "Please enter a valid email address",
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={17}>
        <Card>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="gst" label="GST number">
                <Input placeholder="gst" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="vat" label="Vat number">
                <Input placeholder="vat" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="primary_color" label="Primary Color">
                <Input placeholder="color" type={"color"} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="secondary_color" label="Secondary Color">
                <Input placeholder="color" type={"color"} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="paytm_sandbox" label="Paytm Sandbox">
                <Input placeholder="paytm sandbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="stripe_sandbox" label="Stripe sandbox">
                <Input placeholder="Stripe sandbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="paypal_sandbox" label="Paypal sandbox">
                <Input placeholder="Paypal sandbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="currency" label="Currency">
                <Input placeholder="currency" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="email" label="Email" rules={rules.email}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="address" label="Address">
                <TextArea placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Footer Count">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="leads_generated" label="Leads Generated">
                <Input placeholder="Leads Generated" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="sales_generated" label="Sales Generated">
                <Input placeholder="Sales Generated" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="happy_customer" label="Happy Customers">
                <Input placeholder="Happy Customers" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="registered_partner" label="Registered Partners">
                <Input placeholder="Registered Partners" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card>
          <Form.Item name="logo">
            <SingleFileUpload folder="platform-properties" />
          </Form.Item>

          <Form.Item name="copyright_year" label="Copyright year">
            <Input placeholder="Year" />
          </Form.Item>
          <Form.Item name="maintainace" valuePropName="checked">
            <CustomCheckbox>Maintainace</CustomCheckbox>
          </Form.Item>
        </Card>
        <Card title="Social links">
          <Form.Item name="facebook" label="Facebook">
            <Input placeholder="Facebook" />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input placeholder="Instagram" />
          </Form.Item>
          <Form.Item name="twitter" label="Twitter">
            <Input placeholder="Twitter" />
          </Form.Item>
          <Form.Item name="linkedin" label="LinkedIn">
            <Input placeholder="LinkedIn" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
