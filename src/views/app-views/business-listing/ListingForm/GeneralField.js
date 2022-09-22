import {
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  InputNumber,
  Button,
} from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";

import React, { useEffect, useState } from "react";
import AwardService from "services/Award";
import CategoryService from "services/Category";
import CityService from "services/City";
import utils from "utils";
import TagService from "services/Tag";

const { Option } = Select;

const formStructure = {
  business_name: {
    col: 24,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  description: {
    col: 24,
    isTextEditor: true,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  content: {
    col: 24,
    isTextEditor: true,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  specifications: {
    col: 24,
    isTextEditor: true,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  line_1: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  line_2: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  street: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  city: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  state: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  postcode: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
      {
        pattern: new RegExp("^[0-9]*$"),
        message: "invalid input",
      },
    ],
  },
  ratings: {
    col: 6,
    isNumber: true,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  no_of_employees: {
    col: 6,
    // isNumber: true,

    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
      {
        pattern: new RegExp("^[0-9]*$"),
        message: "invalid input",
      },
    ],
  },
  company_type: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  year_found: {
    col: 6,
    // isNumber: true,

    rules: [
      {
        required: true,
        message: "Please fill this field",
      },

      {
        pattern: new RegExp("^[12][0-9]{3}$"),
        message: "Please enter a valid year",
      },
    ],
  },
  organisation_size: {
    col: 6,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
  contact_phone: {
    col: 12,
    // isNumber: true,

    rules: [
      {
        required: true,
        message: "Please fill this field",
      },

      {
        pattern: new RegExp(
          "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
        ),
        message: "Invalid Phone number",
      },
    ],
  },
  contact_email: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },

      {
        pattern: new RegExp("^(.+)@(.+)$"),
        message: "Please Enter a valid email ",
      },
    ],
  },
  website_url: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
      {
        pattern: new RegExp(
          "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
        ),
        message: "Please enter valid input",
      },
    ],
  },
  video_intro_url: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
      {
        pattern: new RegExp(
          "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
        ),
        message: "Please enter valid input",
      },
    ],
  },
  grading: {
    col: 12,
    rules: [
      {
        required: true,
        message: "Please fill this field",
      },
    ],
  },
};

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  catg: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  name: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  description: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  partners: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  location: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  lat: [
    {
      pattern: new RegExp("^-?([0-8]?[0-9]|90)(.[0-9]{1,10})?$"),
      message: "Please Enter Valid latitude",
    },
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  lng: [
    {
      pattern: new RegExp("^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})$"),
      message: "Please Enter Valid longitude",
    },
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  users: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  features: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  Available_Support: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => {
  const [categories, setCategories] = useState([]);
  const [awards, setAwards] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchAwards();
    fetchLocations();
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await TagService.list();
      if (res) setTags(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list({ page_type: "listing" });
      if (res) setCategories(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchLocations = async (value) => {
    try {
      const res = await CityService.list({ q: value });
      if (res) setLocations(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchAwards = async () => {
    try {
      const res = await AwardService.list();
      if (res) setAwards(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSearch = (value) => {
    if (value) {
      fetchLocations(value);
    } else {
      fetchLocations();
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={16}>
            {Object.entries(formStructure).map((input) => (
              <Col xs={24} sm={24} md={input[1].col}>
                {input[1].isNumber ? (
                  <Form.Item
                    name={input[0]}
                    label={utils.humanize(input[0])}
                    rules={input[1].rules}
                  >
                    <InputNumber placeholder={utils.humanize(input[0])} />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name={input[0]}
                    label={utils.humanize(input[0])}
                    rules={input[1].rules}
                  >
                    {!input[1].isTextEditor ? (
                      <Input placeholder={utils.humanize(input[0])} />
                    ) : (
                      <TextEditor />
                    )}
                  </Form.Item>
                )}
              </Col>
            ))}
          </Row>
          <Form.List name={"features"} rules={rules.features}>
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
                              "Please input feature or delete this field.",
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
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
          <Form.List name={"users"} rules={rules.users}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Users" : ""}
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
                            message: "Please input user or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="User" />
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
                    Add User
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>

          <Form.List name={"available_support"} rules={rules.Available_Support}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Available Support" : ""}
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
                              "Please input Available Support or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Available Support" />
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
                    Add Available Support
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="logo" label="logo" rules={rules.required}>
            <SingleFileUpload folder="bussiness_listing" />
          </Form.Item>
          <Form.Item name="featured_image" label="Image" rules={rules.required}>
            <SingleFileUpload folder="bussiness_listing" />
          </Form.Item>
        </Card>
        <Card title="Other info">
          <Form.Item name="award_id" label="Awards" rules={rules.required}>
            <Select className="w-100" placeholder="Award" mode="multiple">
              {awards.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tag_id" label="Tags" rules={rules.required}>
            <Select
              style={{ width: "100%" }}
              placeholder="Business Tags"
              mode="multiple"
            >
              {tags.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="category_id" label="Category" rules={rules.required}>
            <Select className="w-100" placeholder="Category" mode="multiple">
              {categories.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="location_id" label="Location" rules={rules.required}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Locations"
              onSearch={handleSearch}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
            >
              {locations?.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm?.postcode ?? elm.id}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={rules.required}>
            <Select style={{ width: "100%" }} placeholder="Status">
              <Option value={"under-review"}>Under Review</Option>
              <Option value={"rejected"}>Rejected</Option>
              <Option value={"verified"}>Verified</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="created_by"
            label="Created By"
            rules={rules.required}
          >
            <Select style={{ width: "100%" }} placeholder="Created by">
              <Option value={"admin"}>Admin</Option>
              <Option value={"partner"}>Partner</Option>
            </Select>
          </Form.Item>
          <Form.Item name="lat" label="Latitude" rules={rules.lat}>
            <Input placeholder="Latitude" />
          </Form.Item>
          <Form.Item name="lng" label="Longitude" rules={rules.lng}>
            <Input placeholder="Longitude" />
          </Form.Item>
          <Form.Item name="verified" valuePropName="checked">
            <CustomCheckbox>Verified</CustomCheckbox>
          </Form.Item>
          <Form.Item name="approved" valuePropName="checked">
            <CustomCheckbox>Enable</CustomCheckbox>
          </Form.Item>
          <Form.Item name="active" valuePropName="checked">
            <CustomCheckbox>Active</CustomCheckbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
