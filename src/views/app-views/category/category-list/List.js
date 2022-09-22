import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Menu,
  message,
  Modal,
  Table,
  Tag,
  Tooltip,
  Tabs,
} from "antd";

import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";

import useRestriction from "hooks/useRestriction";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CategoryService from "services/Category";

import Restricted from "views/app-views/permissions/Restricted";
import { env } from "../../../../configs/EnvironmentConfig";
import Utils from "utils";
const { confirm } = Modal;

const CategoryList = (pageType) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isRestricted = useRestriction();
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    page_type: pageType.pageType,
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
      const res = await CategoryService.list(params);
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
      <Restricted to="category_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to="category_delete">
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
    history.push(`/app/category/add-category`);
  };

  const viewDetails = (row) => {
    history.push(`/app/category/edit-category/${row.id}`);
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
          await CategoryService.delete(formdata);
          message.success("Category deleted successfully");
          fetchAll(filter);
          setSelectedRows([]);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={env.BASE_IMG_URL + "/category/" + record.logo}
            name={record.name}
          />
        </div>
      ),
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category",
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (_, record) => (
        <Tag
          {...(Number(record.active) === 1
            ? { color: "green" }
            : { color: "gold" })}
        >
          {Number(record.active) ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex align-items-center justify-content-end">
          <Link
            to={{
              pathname: `${env.CUSTOMER_URL}/services/${
                elm.parent_category === "business" ? "business" : "home"
              }/${elm?.url}`,
            }}
            target="_blank"
          >
            <Tooltip title="URL Link">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                size="small"
              />
            </Tooltip>
          </Link>
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

  const downalodCsvFile = async () => {
    try {
      setIsDownloadLoading(true);
      const res = await CategoryService.downloadCSV(filter);
      if (res) Utils.saveAsFile(res, "category.csv");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDownloadLoading(false);
    }
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
          </Flex>
          <Flex>
            <Button
              className="mr-1"
              onClick={downalodCsvFile}
              type="primary"
              icon={<DownloadOutlined />}
              block
              loading={isDownloadLoading}
              disabled={isDownloadLoading}
            >
              {isDownloadLoading ? "Downloading..." : "Download CSV"}
            </Button>
            {selectedRows.length > 0 ? (
              <Restricted to="category_delete">
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
            <div>
              <Restricted to="category_create">
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Category
                </Button>
              </Restricted>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            loading={isLoading}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            rowSelection={
              !isRestricted("category_delete")
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

export default CategoryList;
