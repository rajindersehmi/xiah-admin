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

  btnLink: [
    {
      required: true,
      message: "This field is required",
    },
    {
      pattern: new RegExp(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      ),

      message: "please enter a valid url(must start with http/https)",
    },
  ],
};

const StaticPageForm = (props) => {
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
                rules={rules.btnLink}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item
                name={["heroSection", "button1Link"]}
                label="Button 1 link"
                rules={rules.btnLink}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                name={["heroSection", "button2Text"]}
                label="Button 2 title"
                rules={rules.btnLink}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item
                name={["heroSection", "button2Link"]}
                label="Button 2 link"
                rules={rules.btnLink}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Business Logo">
          {/* <Form.Item name={["bussinessLogo", "logo"]} label="Business Logos">
            <CustomUpload multiple />
          </Form.Item> */}

          <Form.List name={["bussinessLogo"]} rules={rules.required}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...rest }, idx) => (
                  <>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <Form.Item
                        name={[name, "logo"]}
                        label="Logo"
                        rules={rules.required}
                      >
                        <CustomUpload />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="ml-2"
                      />
                    </div>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-100"
                    icon={<PlusOutlined />}
                  >
                    Add Business Logo
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>
        <Card title="What included section">
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
                      <p>Card {idx + 1}</p>
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
                    Add Card
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Card>

        <Card title="How it works">
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
                name={["howItWork", "button1Tex"]}
                label="Button 1 title"
                rules={rules.btnLink}
              >
                <Input placeholder="Title" />
              </Form.Item>
              y
            </Col>
            <Col md={12}>
              <Form.Item
                name={["howItWork", "button1Link"]}
                label="Button 1 link"
                rules={rules.btnLink}
              >
                <Input placeholder="Link" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Other details">
          <Form.Item
            name="contact_form_id"
            label="Contact Form"
            rules={rules.required}
          >
            <Select className="w-100" placeholder="Contact Form">
              {contactForms.map((elm) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
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

export default StaticPageForm;
