import { Card, Col, Form, Input, message, Row, Select } from "antd";

import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SeoForm from "components/shared-components/SeoForm";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";

import React, { useEffect, useState } from "react";
import AwardService from "services/Award";
import CategoryService from "services/Category";
import TagService from "services/Tag";
import utils from "utils";
import Url from "../../../../components/shared-components/Url";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  link: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  websiteUrl: [
    {
      pattern: new RegExp("[a-zA-Z]+.[a-zA-Z]+"),
      required: true,
      message: "Please fill this field",
    },
  ],
  phone: [
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
  content: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  categ: [{ required: true, message: "Please fill this field" }],
  award: [{ required: true, message: "Please fill this field" }],
  description: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const checkboxes = {
  is_on_business: "1",
  is_on_home: "1",
  is_on_business_service: "1",
  is_on_home_service: "1",
  is_on_homepage: "1",
  is_emerging: "1",
};

const GeneralField = (props) => {
  const [categories, setCategories] = useState([]);
  const [awards, setAwards] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchAwards();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list();
      if (res) setCategories(res.data);
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
  const fetchTags = async () => {
    try {
      const res = await TagService.list();
      if (res) setTags(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Brand name" rules={rules.name}>
            <Input placeholder="Brand name" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={rules.content}>
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <TextEditor />
          </Form.Item>
          <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
              <Url placeholder="Brand url" />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="link" label="Link" rules={rules.link}>
                <Input placeholder="Brand link" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="website_url"
                label="Website url"
                rules={rules.websiteUrl}
              >
                <Input placeholder="Brand website url" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="phone" label="Phone" rules={rules.phone}>
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <SeoForm />
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="logo" label="Image">
            <SingleFileUpload folder="brand" />
          </Form.Item>
        </Card>
        <Card title="Other info">
          <Form.Item
            name="category_id"
            label="Categories"
            rules={rules.required}
          >
            <Select className="w-100" placeholder="Category" mode="multiple">
              {categories.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="award_id" label="Awards">
            <Select
              style={{ width: "100%" }}
              placeholder="Brand award"
              mode="multiple"
            >
              {awards.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tag_id" label="Tags">
            <Select
              style={{ width: "100%" }}
              placeholder="Brand Tags"
              mode="multiple"
            >
              {tags.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {Object.entries(checkboxes).map((checkbox) => (
            <Form.Item name={checkbox[0]} valuePropName="checked">
              <CustomCheckbox>{utils.humanize(checkbox[0])}</CustomCheckbox>
            </Form.Item>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
