import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
} from "antd";
import CustomCheckbox from "components/shared-components/CustomCheckbox";
import SeoForm from "components/shared-components/SeoForm";
import TextEditor from "components/shared-components/TextEditor";
import React, { useEffect, useState } from "react";
import AwardService from "services/Award";
import BrandService from "services/Brand";
import CategoryService from "services/Category";
import CityService from "services/City";
import TagService from "services/Tag";
import UserService from "services/User";
import Url from "../../../../components/shared-components/Url";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
};

const GeneralField = (props) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [awards, setAwards] = useState([]);
  const [locations, setLocations] = useState([]);
  const [partners, setPartners] = useState([]);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchAwards();
    fetchLocations();
    fetchTags();
    fetchPartners();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list({ page_type: "listing" });
      if (res) setCategories(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await UserService.list({
        user_type: "partner",
        partner_verified: "1",
      });
      if (res) setPartners(res.data);
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

  const fetchLocations = async (value) => {
    try {
      const res = await CityService.list({ q: value });
      if (res) setLocations(res.data);
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
          <Form.Item name="name" label="Name" rules={rules.required}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={rules.required}>
            <TextEditor />
          </Form.Item>

          <Url placeholder="Url" />
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="contact_link" label="Contact Link">
                <Input placeholder="Contact link" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="active_from"
                label="Active From"
                rules={rules.required}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="active_till"
                label="Active Till"
                rules={rules.required}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <SeoForm />
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Other info">
          <Form.Item
            name="category_id"
            label="Select category"
            rules={rules.required}
          >
            <Select className="w-100" placeholder="Category">
              {categories.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="publish_id"
            label="Select Publisher"
            rules={rules.required}
          >
            <Select className="w-100" placeholder="Publisher">
              {partners.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {`${elm.first_name} ${elm.last_name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="award_id" label="Award" rules={rules.required}>
            <Select style={{ width: "100%" }} placeholder="Award">
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
          <Form.Item name="brand_id" label="Brand" rules={rules.required}>
            <Select style={{ width: "100%" }} placeholder="Brand">
              {brands.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="location_id" label="Locations">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Locations"
              mode="multiple"
              onSearch={handleSearch}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
            >
              {locations.map((elm, k) => (
                <Option key={elm.id} value={elm.id}>
                  {elm?.district} {elm.postcode}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="is_on_homepage" valuePropName="checked">
            <CustomCheckbox>Is on Home service?</CustomCheckbox>
          </Form.Item>
          <Form.Item name="expired" valuePropName="checked">
            <CustomCheckbox>Expired</CustomCheckbox>
          </Form.Item>
          <Form.Item name="active" valuePropName="checked">
            <CustomCheckbox>Active</CustomCheckbox>
          </Form.Item>
          <Form.Item name="approved" valuePropName="checked">
            <CustomCheckbox>Approved</CustomCheckbox>
          </Form.Item>
        </Card>
        {/* <Card title="Visibility">
          <Form.Item name="visible_in">
            <Radio.Group buttonStyle="solid" defaultValue="across_uk">
              <Radio.Button value="across_uk">Across UK</Radio.Button>
              <Radio.Button value="state">Select State</Radio.Button>
              <Radio.Button value="city">Select City</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.visible_in != currentValues.visible_in
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("visible_in") == "state" && (
                <Form.Item
                  name="state_id"
                  label="State"
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.visible_in != currentValues.visible_in
                  }
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select States"
                    mode="multiple"
                    onSearch={handleSearch}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    notFoundContent={null}
                  >
                    {locations.map((elm, k) => (
                      <Option key={elm.id} value={elm.id}>
                        {elm?.district} {elm.postcode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.visible_in != currentValues.visible_in
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("visible_in") == "city" && (
                <Form.Item
                  name="city_id"
                  label="City"
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.visible_in != currentValues.visible_in
                  }
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select Cities"
                    mode="multiple"
                    onSearch={handleSearch}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    notFoundContent={null}
                  >
                    {locations.map((elm, k) => (
                      <Option key={elm.id} value={elm.id}>
                        {elm?.district} {elm.postcode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            }
          </Form.Item>
        </Card> */}
      </Col>
    </Row>
  );
};

export default GeneralField;
