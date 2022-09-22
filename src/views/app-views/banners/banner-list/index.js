import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Image,
  Input,
  Menu,
  message,
  Modal,
  Select,
  Table,
} from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { env } from "configs/EnvironmentConfig";
import useRestriction from "hooks/useRestriction";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BannerService from "services/Banner";
import Restricted from "views/app-views/permissions/Restricted";

const { confirm } = Modal;
const { Option } = Select;

const customerTypes = ["audit_report", "post_requirement"];
const partnerTypes = ["dashboard", "profile_page"];

const BrandList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isRestricted = useRestriction();
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
  });
  const [totalData, setTotalData] = useState(0);

  const _onFilterChange = (idx, value) =>
    setFilter((prev) => ({ ...prev, [idx]: value }));

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
      const res = await BannerService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Restricted to={"banner_edit"}>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to={"banner_delete"}>
        <Menu.Item onClick={() => deleteRow(row)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">
              {selectedRows.length > 0
                ? `Delete (${selectedRows.length})`
                : "Delete"}
            </span>
          </Flex>
        </Menu.Item>
      </Restricted>
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/banners/add-banner`);
  };

  const viewDetails = (row) => {
    history.push(`/app/banners/edit-banner/${row.id}`);
  };

  const deleteRow = async (row) => {
    confirm({
      title: "Do you want to delete?",
      content:
        "When clicked the OK button, these records will be deleted permenantly.",
      async onOk() {
        try {
          const formdata = new FormData();
          if (selectedRows.length > 0)
            selectedRows.forEach((r) => {
              formdata.append("id[]", r.id);
            });
          else {
            formdata.append("id[]", row.id);
          }
          await BannerService.delete(formdata);
          message.success("Banner deleted successfully");
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "Banner",
      dataIndex: "image",
      render: (_, record) => (
        <div className="d-flex">
          <Image
            src={env.BASE_IMG_URL + "/banners/" + record.image}
            width={150}
            height={60}
            preview
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    // {
    //   title: "Action Link",
    //   dataIndex: "action_link",
    //   render: (_, record) => (
    //     <Link target="_blank" href={record.action_link}>
    //       {record.action_link}
    //     </Link>
    //   ),
    // },
    {
      title: "Duration",
      render: (_, record) => (
        <span className="small">
          {record.start_at} <ArrowRightOutlined /> {record.end_at}
        </span>
      ),
    },
    {
      title: "Platform",
      dataIndex: "platform",
    },
    {
      title: "Banner Type",
      dataIndex: "type",
    },
    {
      title: "User Clicks",
      dataIndex: "banner_analytic_count",
    },
    {
      title: "Order",
      dataIndex: "order",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
                allowClear
              />
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                placeholder="Platform"
                onChange={(value) => _onFilterChange("platform", value)}
              >
                <Option value="">Both Platform</Option>
                <Option value="customer">Customer Panel</Option>
                <Option value="partner">Partner Panel</Option>
              </Select>
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                placeholder="Banner Type"
                onChange={(value) => _onFilterChange("type", value)}
              >
                <Option value="">All Banner types</Option>
                {(filter.platform === "customer"
                  ? customerTypes
                  : partnerTypes
                )?.map((type) => (
                  <Option value={type}>{type}</Option>
                ))}
              </Select>
            </div>
          </Flex>
          <Flex>
            {selectedRows.length > 0 ? (
              <Restricted to={"banner_delete"}>
                <Button
                  onClick={deleteRow}
                  type="danger"
                  icon={<DeleteOutlined />}
                  className="mr-3"
                  block
                >
                  Delete ({selectedRows.length})
                </Button>
              </Restricted>
            ) : null}
            <Restricted to={"banner_create"}>
              <Button
                onClick={addProduct}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add Banner
              </Button>
            </Restricted>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            loading={isLoading}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            rowSelection={
              !isRestricted("banner_delete")
                ? {
                    selectedRowKeys: selectedRowKeys,
                    type: "checkbox",
                    preserveSelectedRowKeys: false,
                    ...rowSelection,
                  }
                : null
            }
            pagination={{
              ...paginationOptions,
              total: totalData,
              current: filter.page,
              pageSize: filter.perPage,
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default BrandList;
