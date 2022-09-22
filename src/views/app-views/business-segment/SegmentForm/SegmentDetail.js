import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

import { env } from "configs/EnvironmentConfig";
import { MAX_FILE_SIZE } from "constants/ApiConstant";
import React, { useEffect, useState } from "react";
import CategoryService from "services/Category";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "This field is required",
    },
  ],
};

const SegmentDetail = (props) => {
  const [contactForms, setContactForms] = useState([]);

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
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Hero Section">
          <Form.Item
            name={["heroSection", "title"]}
            label="Title"
            rules={rules.required}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={["heroSection", "description"]}
            label="Description"
            rules={rules.required}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name={["heroSection", "image"]}
            label="Image"
            rules={rules.required}
          >
            <CustomUpload />
          </Form.Item>
          <Row gutter={16}>
            <Col md={12}>
              <Form.Item
                name={["heroSection", "button1Text"]}
                label="Button 1 title"
                rules={rules.required}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item
                name={["heroSection", "button1Link"]}
                label="Button 1 link"
                rules={rules.required}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                name={["heroSection", "button2Text"]}
                label="Button 2 title"
                rules={rules.required}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item
                name={["heroSection", "button2Link"]}
                label="Button 2 link"
                rules={rules.required}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Secondary Section">
          <Form.Item
            name={["howItWork", "title"]}
            label="Title"
            rules={rules.required}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={["howItWork", "description"]}
            label="Description"
            rules={rules.required}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            name={["howItWork", "image"]}
            label="Image"
            rules={rules.required}
          >
            <CustomUpload />
          </Form.Item>
          <Row gutter={16}>
            <Col md={12}>
              <Form.Item
                name={["howItWork", "button1Text"]}
                label="Button 1 title"
                rules={rules.required}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                name={["howItWork", "button1Link"]}
                label="Button 1 link"
                rules={rules.required}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Benefits Section">
          <Form.Item
            name={["whatIncluded", "title"]}
            label="Title"
            rules={rules.required}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={["whatIncluded", "description"]}
            label="Description"
            rules={rules.required}
          >
            <TextArea />
          </Form.Item>

          <Form.List
            name={["whatIncluded", "whatIncludedArray"]}
            rules={rules.required}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...rest }, idx) => (
                  <>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <p>Benefit {idx + 1}</p>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                    <Form.Item
                      className="w-100"
                      {...rest}
                      name={[name, "title"]}
                      rules={rules.required}
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                      {...rest}
                      name={[name, "description"]}
                      rules={rules.required}
                    >
                      <TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "image"]}
                      label="Image"
                      rules={rules.required}
                    >
                      <CustomUpload />
                    </Form.Item>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-100"
                    icon={<PlusOutlined />}
                  >
                    Add Benefit
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>
      </Col>
    </Row>
  );
};

const CustomUpload = (props) => {
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]?.size > MAX_FILE_SIZE) {
      setError("Max file upload limit is 1 MB");
    } else {
      setError(null);
      props.onChange(e.target.files[0]);
    }
  };
  return (
    <>
      <Input type="file" onChange={handleChange} />
      {error && <p style={{ color: "rgb(255, 107, 114)" }}>{error}</p>}
      {typeof props.value === "string" && (
        <Image
          src={`${env.BASE_IMG_URL}/category/${props.value}`}
          style={{ height: 100, width: 180, objectFit: "contain" }}
          className="mt-2"
        />
      )}
    </>
  );
};

export default SegmentDetail;
