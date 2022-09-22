import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Tag, Input, Menu, message, Modal, Table, Tooltip } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { env } from "configs/EnvironmentConfig";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageService from "services/Page";
import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";
import useRestriction from "hooks/useRestriction";

const { confirm } = Modal;

const PageList = ({ published }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isRestricted = useRestriction();
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    published,
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
      const res = await PageService.list(params);
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
      <Restricted to={"pages_edit"}>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to={"pages_delete"}>
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
    history.push(`/app/pages/add-page`);
  };

  const viewDetails = (row) => {
    history.push(`/app/pages/edit-page/${row.id}`);
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
          await PageService.delete(formdata);
          setSelectedRows([]);
          message.success("Page deleted successfully");
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
      dataIndex: "id",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (date) => <RetrieveDate date={date} />,
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      render: (date) => <RetrieveDate date={date} />,
    },

    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Published",
      dataIndex: "is_published",
      render: (_, elm) => (
        <Tag color={elm?.published === 1 ? "success" : "warning"}>
          {elm?.published === 1 ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Footer Heading",
      dataIndex: "footer_category",
      render: (cat) => (cat === "null" ? "N/A" : cat),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex align-items-center justify-content-end">
          <Link
            to={{ pathname: `${env.CUSTOMER_URL}/pages/${elm?.url}` }}
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

  return (
    <>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false} alignItems="center">
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <Flex>
          {selectedRows.length > 0 ? (
            <Restricted to={"pages_delete"}>
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
          <Restricted to={"pages_create"}>
            <Button
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Page
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
            !isRestricted("pages_delete")
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
    </>
  );
};

export default PageList;
