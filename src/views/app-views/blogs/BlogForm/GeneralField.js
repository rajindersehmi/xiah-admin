import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
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
import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SeoForm from "components/shared-components/SeoForm";
import SingleFileUpload from "components/shared-components/SingleFileUpload";
import TextEditor from "components/shared-components/TextEditor";
import React, { useEffect, useState } from "react";
import CategoryService from "services/Category";
import Url from "../../../../components/shared-components/Url";

const { Option } = Select;

const rules = {
  url: [
    {
      required: true,
      pattern: new RegExp("[a-zA-Z]+.[a-zA-Z]+"),
      message: "Please fill this field",
    },
  ],

  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],

  views: [
    {
      pattern: new RegExp("[0-9]"),
      message: "Please entre valid number",
    },
  ],

  content: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const blogType = ["comparision", "news", "guide", "event"];

const GeneralField = (props) => {
  const [categories, setCategories] = useState([]);
  const [blogType, setBlogType] = useState("");



  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="title" label="Title" rules={rules.required}>
            <Input placeholder="Blog title" />
          </Form.Item>

          <Url placeholder="Blog url" />
          <Form.Item name="content" label="Content" rules={rules.required}>
            <TextEditor />
          </Form.Item>
          <Form.List name="tags" rules={rules.required}>
            {(fields, { add, remove }, { errors }) => (
              <>
                <Row gutter={16}>
                  {fields.map((field, index) => (
                    <Col xs={24} md={6}>
                      <Form.Item
                        required={true}
                        key={field.key}
                        label={`Tag ${index + 1}`}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={rules.required}
                          noStyle
                        >
                          <Input placeholder="Tag" style={{ width: "80%" }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button ml-1"
                          onClick={() => remove(field.name)}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Tag
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>
        <SeoForm />
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item name="image" label="Image" rules={rules.required}>
            <SingleFileUpload folder="blog" />
          </Form.Item>
        </Card>
        <Card title="Other info">
          <Form.Item name="category_id" label="Category" rules={rules.required}>
            <Select className="w-100" placeholder="Category">
              {categories.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="blog_type" label="Blog Type" rules={rules.required}>
            <CustomSelect setBlogType={setBlogType} />
          </Form.Item>
          {blogType === "event" && (
            <>
              <Form.Item
                name="start_date"
                label="Start Date"
                rules={rules.required}
              >
                <DatePicker className="w-100" />
              </Form.Item>{" "}
              <Form.Item
                name="end_date"
                label="End Date"
                rules={rules.required}
              >
                <DatePicker className="w-100" />
              </Form.Item>
              <Form.Item
                name="location"
                label="Event Location"
                rules={rules.required}
              >
                <Input placeholder="Event Location" />
              </Form.Item>
              <Form.Item
                name="event_link"
                label="Event Link"
                rules={rules.required}
              >
                <Input placeholder="Event Link" />
              </Form.Item>
            </>
          )}
          <Form.Item name="views" label="Views" rules={rules.views}>
            <Input placeholder="View" className="w-100" min={0} />
          </Form.Item>
          <Form.Item name="published" valuePropName="checked">
            <CustomCheckbox>Published </CustomCheckbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

const CustomSelect = (props) => {
  const { onChange, value, setBlogType } = props;

  useEffect(() => {
    setBlogType(value);
  }, [value]);

  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder="Blog Category"
    >
      {blogType.map((elm, k) => (
        <Option value={elm} key={k}>
          {elm}
        </Option>
      ))}
    </Select>
  );
};

export default GeneralField;
