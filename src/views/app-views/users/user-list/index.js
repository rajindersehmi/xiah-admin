import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Card,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Table,
  Button,
  Tag,
} from "antd";

import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";

import { env } from "configs/EnvironmentConfig";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserService from "services/User";
import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";
import Utils from "utils";

const { confirm } = Modal;

const UserList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    user_type: "admin",
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
      const res = await UserService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUserApproved = async (row) => {
    if (!row) return;
    confirm({
      title: `Do you want to ${row.approved ? "disabled" : "enable"} ?`,
      content: `When clicked the OK button, the user will we ${
        row.approved ? "disabled" : "enabled"
      }.`,
      async onOk() {
        try {
          const formdata = new FormData();
          formdata.append("approved", row?.approved ? 0 : 1);
          await UserService.disable(row.id, formdata);
          message.success(
            `User ${row.approved ? "disabled" : "enabled"} successfully`
          );
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Restricted to="user_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to="user_delete">
        <Menu.Item onClick={() => toggleUserApproved(row)}>
          <Flex alignItems="center">
            {Number(row?.approved) === 1 ? (
              <DislikeOutlined />
            ) : (
              <LikeOutlined />
            )}
            <span className="ml-2">
              {Number(row?.approved) === 1 ? "Disable" : "Enable"}
            </span>
          </Flex>
        </Menu.Item>
      </Restricted>
    </Menu>
  );

  const viewDetails = (row) => {
    history.push(`/app/users/edit-user/${row.id}`);
  };

  const addUser = (row) => {
    history.push(`/app/users/add-user/`);
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
          await UserService.delete(formdata);
          setSelectedRows([]);
          message.success("User deleted successfully");
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
      title: "Status",
      dataIndex: "approved",
      render: (_, elm) => (
        <Tag color={Number(elm.approved) === 1 ? "success" : "error"}>
          {Number(elm.approved) === 1 ? "Enabled" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: " ",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex align-items-center justify-content-end">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  const downalodCsvFile = async () => {
    try {
      setIsDownloadLoading(true);
      const res = await UserService.downloadCSV(filter);
      if (res) Utils.saveAsFile(res, "users.csv");
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
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Radio.Group
                value={filter.user_type}
                onChange={(e) => _onFilterChange("user_type", e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="super_admin">Super Admin</Radio.Button>
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="customer">Customer</Radio.Button>
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
              <Button
                onClick={deleteRow}
                type="danger"
                icon={<DeleteOutlined />}
                className="mr-3"
                block
              >
                Delete ({selectedRows.length})
              </Button>
            ) : null}
            {/* <div> */}
            <>
              <Restricted to="user_create">
                <Button
                  onClick={addUser}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add User
                </Button>
              </Restricted>
            </>
            {/* </div> */}
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            loading={isLoading}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            // rowSelection={{
            //   selectedRowKeys: selectedRowKeys,
            //   type: "checkbox",
            //   preserveSelectedRowKeys: false,
            //   ...rowSelection,
            // }}
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

export default UserList;
