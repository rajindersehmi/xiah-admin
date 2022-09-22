import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  Radio,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";

import { env } from "configs/EnvironmentConfig";

import React, { useState, useEffect } from "react";
import UserService from "services/User";

const { Option } = Select;

const rules = {
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
  type: [
    {
      required: true,
      message: "Please fill this field",
    },
  ],
  required: [
    {
      required: true,
      message: "Please enter this field",
    },
  ],
};

const sendToTypes = ["admin", "customer", "partner", "Custom List"];

const GeneralField = (props) => {
  const { onSelectRowsChange } = props;
  const [list, setList] = useState([]);
  const [sendTo, setSendTo] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    user_type: "customer",
  });
  const [totalData, setTotalData] = useState(0);

  const _pageSizeChange = (_, pageSize) => _onFilterChange("perPage", pageSize);
  const _pageChange = (page) => _onFilterChange("page", page);

  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: _pageSizeChange,
    onChange: _pageChange,
    pageSizeOptions: [10, 20, 30, 40, 50],
    total: totalData,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };

  useEffect(() => {
    fetchAll(filter);
  }, [filter]);

  const fetchAll = async (params) => {
    setIsLoading(true);
    try {
      const res = await UserService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const _onFilterChange = (idx, value) =>
    setFilter((prev) => ({ ...prev, [idx]: value }));

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      render: (_, elm) => (
        <AvatarStatus
          src={env.BASE_IMG_URL + "/user/" + elm.profile_picture}
          name={`${elm.first_name || ""} ${elm.last_name || ""}`}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "user_type",
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      onSelectRowsChange(rows);
      setSelectedRowKeys(key);
    },
  };
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <Form.Item name="title" label="Title" rules={rules.name}>
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={rules.description}
            >
              <Input placeholder="Description" />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Card title="Other info">
            <Form.Item name="send_to" label="Send to?" rules={rules.type}>
              <CustomSelect setSendTo={setSendTo} />
            </Form.Item>
            <Form.Item name="schedule_date" label="Select Date">
              <DatePicker className="w-100" />
            </Form.Item>
            <Form.Item name="schedule_time" label="Select Time">
              <DatePicker picker="time" className="w-100" />
            </Form.Item>
          </Card>
        </Col>
      </Row>
      {sendTo === "Custom List" && (
        <Row>
          <Col xs={24} sm={24} md={24}>
            <Card title="Custom List">
              <div className="table-responsive">
                <Flex className="mb-1" mobileFlex={false}>
                  <div className="mr-md-3 mb-3">
                    <Radio.Group
                      value={filter.user_type}
                      onChange={(e) => {
                        _onFilterChange("user_type", e.target.value);
                        _onFilterChange("page", 1);
                      }}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="super_admin">
                        Super Admin
                      </Radio.Button>
                      <Radio.Button value="admin">Admin</Radio.Button>
                      <Radio.Button value="customer">Customer</Radio.Button>
                      <Radio.Button value="partner">Partner</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="mr-md-3 mb-3">
                    <Input
                      placeholder="Search"
                      prefix={<SearchOutlined />}
                      onChange={onSearch}
                    />
                  </div>
                </Flex>
                <Table
                  loading={isLoading}
                  columns={tableColumns}
                  dataSource={list}
                  rowKey="id"
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    type: "checkbox",
                    preserveSelectedRowKeys: true,
                    ...rowSelection,
                  }}
                  pagination={{
                    ...paginationOptions,
                    total: totalData,
                    current: filter.page,
                    pageSize: filter.perPage,
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

const CustomSelect = (props) => {
  const { onChange, setSendTo, value } = props;

  const handleChange = (v) => {
    onChange(v);
    setSendTo(v);
  };
  return (
    <Select
      value={value}
      placeholder="Select User type"
      onChange={handleChange}
    >
      {sendToTypes.map((type) => (
        <Option value={type}>{type}</Option>
      ))}
    </Select>
  );
};
export default GeneralField;
