import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Menu, message, Modal, Table, Tag } from "antd";

import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";

import { env } from "configs/EnvironmentConfig";
import useRestriction from "hooks/useRestriction";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BlogService from "services/Blog";
import RetrieveDate from "services/RetrieveDate";

import Restricted from "views/app-views/permissions/Restricted";

const { confirm } = Modal;

const BlogList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  console.log({list})
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
      const res = await BlogService.list(params);
      setList(res);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item>
        <Link
          to={{ pathname: `${env.CUSTOMER_URL}/blogs/${row?.url}` }}
          target="_blank"
        >
          <Flex alignItems="center">
            <LinkOutlined />
            <span className="ml-2">Go to Blog</span>
          </Flex>
        </Link>
      </Menu.Item>
      <Restricted to="blog_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to="blog_delete">
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
    history.push(`/app/blogs/add-blog`);
  };

  const viewDetails = (row) => {
    history.push(`/app/blogs/edit-blog/${row.id}`);
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
          await BlogService.delete(formdata);
          setSelectedRows([]);
          message.success("Blog deleted successfully");
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
      title: "ID",
      dataIndex: "_id",
    },

    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Blog Type",
      dataIndex: "blog_type",
    },
    {
      title: "Header",
      dataIndex: "content",
      render: (_, elm) => elm?.content[0]?.header,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (_, elm) => (
        <Tag color={elm.isActive ? "success" : "warning"}>
          {elm.isActive ? "Yes" : "No"}
        </Tag>
      ),
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
          </Flex>
          <Flex>
            {selectedRows.length > 0 ? (
              <Restricted to={"blog_delete"}>
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
            <Restricted to={"blog_create"}>
              <Button
                onClick={addProduct}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add Blog
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
              !isRestricted("blog_delete")
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
      {/* )} */}
    </>
  );
};

export default BlogList;
