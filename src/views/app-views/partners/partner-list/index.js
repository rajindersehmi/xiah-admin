import {
  DislikeOutlined,
  EyeOutlined,
  LikeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Table,
  Tag,
} from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";

import { env } from "configs/EnvironmentConfig";
import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserService from "services/User";

const { confirm } = Modal;

const PartnerList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    user_type: "partner",
    partner_verified: "1",
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
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => toggleUserApproved(row)}>
        <Flex alignItems="center">
          {Number(row?.approved) === 1 ? <DislikeOutlined /> : <LikeOutlined />}
          <span className="ml-2">
            {Number(row?.approved) === 1 ? "Disable" : "Enable"}
          </span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  );

  const viewDetails = (row) => {
    history.push(`/app/partners/profile/${row.id}`);
  };

  // const deleteRow = async (row) => {
  //   confirm({
  //     title: "Do you want to delete?",
  //     content:
  //       "When clicked the OK button, these records will be deleted permenantly.",
  //     async onOk() {
  //       try {
  //         const formdata = new FormData();
  //         if (selectedRows.length > 0)
  //           selectedRows.map((r) => {
  //             formdata.append("id[]", r.id);
  //           });
  //         else {
  //           formdata.append("id[]", row.id);
  //         }
  //         await UserService.delete(formdata);
  //         setSelectedRows([]);
  //         message.success("Partner disabled successfully");
  //         fetchAll(filter);
  //       } catch (error) {
  //         message.error(error.message);
  //       }
  //     },
  //     onCancel() {},
  //   });
  // };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Partner",
      dataIndex: "first_name",
      render: (_, elm) => (
        <AvatarStatus
          src={`${env.BASE_IMG_URL}/user/${elm.profile_picture}`}
          name={`${elm.first_name} ${elm.last_name}`}
        />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Company Name",
      dataIndex: "partner_details",
      render: (_, elm) => `${elm?.partner_details?.company_name ?? "N/A"}`,
    },
    {
      title: "Company Website",
      dataIndex: "partner_details",
      render: (_, elm) => `${elm?.partner_details?.company_website ?? "N/A"}`,
    },
    {
      title: "Business Tags",
      dataIndex: "partner_details",
      render: (_, elm) =>
        elm?.partner_details?.bussiness_tags
          ? JSON.parse(elm.partner_details.bussiness_tags).map((t) => (
              <Tag color={"blue"}>{t}</Tag>
            ))
          : "N/A",
    },
    {
      title: "Wallet Balance",
      dataIndex: "wallet",
      render: (_, elm) =>
        `${CURRENCY_SYMBOL} ${
          elm?.wallets?.length > 0 ? elm?.wallets[0]?.balance : 0
        }`,
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
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Radio.Group
                value={filter.partner_verified}
                onChange={(e) =>
                  _onFilterChange("partner_verified", e.target.value)
                }
                buttonStyle="solid"
              >
                <Radio.Button value="1">Verified</Radio.Button>
                <Radio.Button value="0">Not Verified</Radio.Button>
              </Radio.Group>
            </div>
          </Flex>
          <Flex>
            {selectedRows.length > 0 ? (
              <Button
                onClick={toggleUserApproved}
                type="danger"
                icon={<DislikeOutlined />}
                className="mr-3"
                block
              >
                Disable ({selectedRows.length})
              </Button>
            ) : null}
            <Flex className="mb-1" mobileFlex={false}>
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={onSearch}
              />
            </Flex>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            loading={isLoading}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
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
    </>
  );
};

export default PartnerList;
