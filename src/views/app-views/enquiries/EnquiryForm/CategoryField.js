import { Card, Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryService from "services/Category";

import {
  BusinessContinuityFields,
  CloudTelephonyFields,
  CyberSecurityFields,
  IOTFields,
  LeasedLineFields,
  M2MFields,
  MPLSFields,
  PBXFields,
  PhoneLineFields,
  PhoneNumberFields,
  Requirement,
  SDWANFields,
} from "./CategoryFieldsData";

const { Option } = Select;

const CategoryFields = (props) => {
  const enquiry_type = "contact_form";
  const [selectedForm, setSelectedForm] = useState(null);

  const fieldsSelector = useMemo(() => {
    switch (selectedForm) {
      case 1:
        return BusinessContinuityFields;
      case 2:
        return LeasedLineFields;
      case 3:
        return IOTFields;
      case 4:
        return M2MFields;
      case 5:
        return CloudTelephonyFields;
      case 6:
        return PBXFields;
      case 7:
        return MPLSFields;
      case 8:
        return SDWANFields;
      case 9:
        return CyberSecurityFields;
      case 10:
        return PhoneLineFields;
      case 11:
        return PhoneNumberFields;
      case 12:
        return Requirement;
      case 13:
        return Requirement;
      default:
        return [];
    }
  }, [selectedForm]);

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item name="contact_form_id" label="Contact Form">
            <SelectContactForm setSelectedForm={setSelectedForm} />
          </Form.Item>
        </Col>

        {fieldsSelector.map(({ name, label, type, ...rest }) => {
          if (type === "select")
            return (
              <Col xs={24} sm={24} md={8}>
                <Form.Item name={[enquiry_type, name]} label={label}>
                  <Select placeholder={`Select ${label}`}>
                    {rest.options.map(({ label, value }) => (
                      <Option key={value} value={value} disabled={true}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            );

          if (type === "checkbox")
            return (
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name={[enquiry_type, name]}
                  label={label}
                  valuePropName="checked"
                >
                  <Checkbox>{label}</Checkbox>
                </Form.Item>
              </Col>
            );

          return (
            <Col xs={24} sm={24} md={8}>
              <Form.Item name={[enquiry_type, name]} label={label}>
                <Input placeholder={`Enter ${label}`} />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

const SelectContactForm = (props) => {
  const params = useParams();
  const { value, onChange, setSelectedForm } = props;
  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    setSelectedForm(value);
  }, [value]);

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    try {
      const res = await CategoryService.contact_forms();
      if (res) setContactForms(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSelectChange = useCallback((value) => {
    onChange(value);
  }, []);
  return (
    <Select
      className="w-100"
      placeholder="Contact Form"
      onChange={handleSelectChange}
      value={value}
      disabled={!!params?.id}
    >
      {contactForms.map((elm) => (
        <Option key={elm.id} value={elm.id}>
          {elm.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategoryFields;
