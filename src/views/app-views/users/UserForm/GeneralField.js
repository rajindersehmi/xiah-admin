import { Card, Col, Form, Input, Row, Select, Table, Tag } from "antd";

import CustomCheckbox from "components/shared-components/CustomCheckbox";
import Flex from "components/shared-components/Flex";
import SingleFileUpload from "components/shared-components/SingleFileUpload";

import React from "react";
import { useParams } from "react-router-dom";

import utils from "utils";
import AssignRole from "./AssignRole";

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  phone: [
    {
      required: true,
      message: "Phone is required",
    },
    {
      pattern: new RegExp(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
      ),
      message: "Invalid Phone number",
    },
  ],
  name: [
    {
      whitespace: true,
      required: true,
      message: "Please fill this field",
    },
    {
      pattern: new RegExp("[a-z]"),
      message: "Please enter a valid name",
    },
  ],
  email: [
    {
      required: true,
      message: "Please fill this field",
    },

    {
      pattern: new RegExp("^(.+)@(.+)$"),
      message: "Please Enter a valid email ",
    },
  ],
};

const addressTableColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  // {
  //   title: "Created at",
  //   dataIndex: "created_at",
  //   render: (date) => <RetrieveDate date={date} />,
  // },
  // {
  //   title: "Updated at",
  //   dataIndex: "updated_at",
  //   render: (date) => <RetrieveDate date={date} />,
  // },

  {
    title: "Address Type",
    dataIndex: "address_type",
    render: (ele) =>
      ele && <Tag style={{ textTransform: "capitalize" }}>{ele}</Tag>,
  },
  {
    title: "Address",
    dataIndex: "address_line_1",
    render: (_, elm) => (
      <>
        <p style={{ marginBottom: "0px" }}>{elm.address_line_1},</p>
        <p style={{ marginBottom: "0px" }}>{elm.address_line_2}</p>
      </>
    ),
  },
  {
    title: "Street Address",
    dataIndex: "street_address",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Postcode",
    dataIndex: "postcode",
  },
];
const existingServiceTableColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Broadband",
    children: [
      {
        title: "Provider",
        dataIndex: "broadband_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "broadband_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "broadband_payg",
      },
    ],
  },
  {
    title: "TV Plan",
    children: [
      {
        title: "Provider",
        dataIndex: "tv_plan_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "tv_plan_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "tv_plan_payg",
      },
    ],
  },
  {
    title: "Phone Line",
    children: [
      {
        title: "Provider",
        dataIndex: "phone_line_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "phone_line_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "phone_line_payg",
      },
    ],
  },
  {
    title: "OTT Plan",
    children: [
      {
        title: "Provider",
        dataIndex: "ott_plan_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "ott_plan_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "ott_plan_payg",
      },
    ],
  },
  {
    title: "Data Plan",
    children: [
      {
        title: "Provider",
        dataIndex: "data_plan_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "data_plan_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "data_plan_payg",
      },
    ],
  },
  {
    title: "Mobile",
    children: [
      {
        title: "Provider",
        dataIndex: "mobile_service_provider",
      },
      {
        title: "Contract End Date",
        dataIndex: "mobile_contract",
      },
      {
        title: "Paygrade",
        dataIndex: "mobile_payg",
      },
    ],
  },
];

const userTypes = ["admin", "customer"];
const GeneralField = (props) => {
  const { userData } = props;
  const param = useParams();
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="first_name" label="First name" rules={rules.name}>
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item name="last_name" label="Last name" rules={rules.name}>
            <Input placeholder="Last name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input placeholder="email" disabled={!!userData?.email} />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={rules.phone}>
            <Input placeholder="Phone" disabled={!!userData?.phone} />
          </Form.Item>
          {!param.id && (
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Password" rules={rules.required} />
            </Form.Item>
          )}
        </Card>
        {userData?.user_type === "customer" && userData?.addresses.length != 0 && (
          <Card title="Addresses">
            <div className="table-responsive">
              <Table
                columns={addressTableColumns}
                dataSource={userData?.addresses}
                rowKey="id"
                // rowSelection={{
                //   selectedRowKeys: selectedRowKeys,
                //   type: "checkbox",
                //   preserveSelectedRowKeys: false,
                //   ...rowSelection,
                // }}
                pagination={false}
              />
            </div>
          </Card>
        )}
        {userData?.user_type === "customer" &&
          userData?.existing_services.length != 0 && (
            <Card title="Existing Services">
              <div className="table-responsive">
                <Table
                  columns={existingServiceTableColumns}
                  dataSource={userData?.existing_services}
                  rowKey="id"
                  // rowSelection={{
                  //   selectedRowKeys: selectedRowKeys,
                  //   type: "checkbox",
                  //   preserveSelectedRowKeys: false,
                  //   ...rowSelection,
                  // }}
                  pagination={false}
                  scroll={{ x: 2500 }}
                />
              </div>
            </Card>
          )}
      </Col>
      <Col xs={24} sm={24} md={7}>
        {param.id && (
          <Card title="Media">
            <Form.Item name="profile_picture" label="Profie Picture">
              <SingleFileUpload folder="user" />
            </Form.Item>
          </Card>
        )}
        <Card title="Other Info">
          <Form.Item name="user_type" label="User Type" rules={rules.required}>
            <Select>
              {userTypes.map((type) => (
                <Option value={type}>{utils.humanize(type)}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"is_fixed_otp"} valuePropName="checked">
            <CustomCheckbox>Fixed Otp ?</CustomCheckbox>
          </Form.Item>
        </Card>
        {props.mode === "EDIT" && <AssignRole role={userData?.roles} />}
      </Col>
      <Col xs={24} md={24} lg={24}></Col>
    </Row>
  );
};

export default GeneralField;
