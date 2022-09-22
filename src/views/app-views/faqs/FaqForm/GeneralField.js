import { Card, Col, Form, Input, message, Row, Select } from "antd";
import CustomCheckbox from "components/shared-components/CustomCheckbox";
import TextEditor from "components/shared-components/TextEditor";
import React, { useEffect, useState } from "react";
import BrandService from "services/Brand";
import CategoryService from "services/Category";
import utils from "utils";

const { Option } = Select;

const rules = {
  title: [
    {
      required: true,
      message: "Please enter  title",
    },
  ],
  content: [
    {
      required: true,
      message: "Please enter  content",
    },
  ],
};
const checkboxes = {
  is_visible_homepage: "1",
  is_visible_business: "1",
  is_visible_home: "1",
};
const GeneralField = (props) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list();
      if (res) setCategories(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  const fetchBrands = async () => {
    try {
      const res = await BrandService.list();
      if (res) setBrands(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="title" label="Title" rules={rules.title}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={rules.content}>
            <TextEditor />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Other Info">
          <Form.Item name="brand_id" label="Brands">
            <Select className="w-100" placeholder="Brands" mode="multiple">
              {brands.map((elm) => (
                <Option key={elm.id} value={elm.id}>
                  {elm?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="category_id" label="Categories">
            <Select className="w-100" placeholder="Category" mode="multiple">
              {categories.map((elm) => (
                <Option key={elm.id} value={elm.id}>
                  {elm?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {Object.entries(checkboxes).map((checkbox) => (
            <Form.Item
              name={checkbox[0]}
              key={checkbox[0]}
              valuePropName="checked"
            >
              <CustomCheckbox>{utils.humanize(checkbox[0])}</CustomCheckbox>
            </Form.Item>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
