import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
} from "antd";

import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";

import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import React, { useEffect, useState } from "react";
import CategoryService from "services/Category";
import ExtraServiceContent from "services/ExtraContent";
import TagService from "services/Tag";
import Utils from "utils";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please enter this field!",
    },
  ],

  price: [
    {
      required: true,
      message: "Please enter this field!",
    },
    {
      pattern: new RegExp("^[0-9]*$"),
      message: "please enter a valid number",
    },
  ],
  rating: [
    {
      required: true,
      message: "Please enter this field!",
    },
    {
      pattern: new RegExp("^[0-9]*$"),
      message: "please enter a valid number",
    },
  ],
};

const GeneralField = (props) => {
  const [tags, setTags] = useState([]);
  const [extraContent, setExtraContent] = useState([]);

  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchExtraServiceContent();
    fetchContactForms();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await TagService.list();
      if (res) setTags(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchExtraServiceContent = async () => {
    try {
      const res = await ExtraServiceContent.list();
      if (res) setExtraContent(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchContactForms = async () => {
    try {
      const res = await CategoryService.contact_forms();
      if (res) setContactForms(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.required}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.required}
          >
            <TextEditor />
          </Form.Item>
          <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="rating" label="Rating" rules={rules.rating}>
                <Input placeholder="Rating" min={0} max={5} className="w-100" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="website" label="Website " rules={rules.required}>
                <Input placeholder="Website" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="price" label="Price" rules={rules.price}>
                <Input placeholder="Price" min={0} prefix={CURRENCY_SYMBOL} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="contact_form_id"
                label="Contact Form"
                rules={rules.required}
              >
                <Select>
                  {contactForms.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.List name={"features"}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Features" : ""}
                    required={false}
                    key={field.key}
                  >
                    <div className="d-flex align-items-center">
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Feature" />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-2"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-100"
                    icon={<PlusOutlined />}
                  >
                    Add Feature
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name={"metrics_list"}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Metrics List" : ""}
                    required={false}
                    key={field.key}
                  >
                    <div className="d-flex align-items-center">
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Feature" />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-2"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-100"
                    icon={<PlusOutlined />}
                  >
                    Add Metrics List
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="image" label="Image">
            <SingleFileUpload folder="business_listing_image" />
          </Form.Item>
        </Card>

        <Card title="Other info">
          <Form.Item name="tag_id" label="Tags">
            <Select
              style={{ width: "100%" }}
              placeholder=" Tags"
              mode="multiple"
            >
              {tags.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" rules={rules.required}>
            <Radio.Group>
              <Radio value="cloud-crm">Cloud CRM</Radio>
              <Radio value="hosting">Hosting</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="content_id"
            label="Extra Service Content"
            rules={rules.required}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Extra Service Content"
            >
              {extraContent?.map((elm, k) => (
                <Option key={k} value={elm.id}>
                  {Utils.humanize(elm.title)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
