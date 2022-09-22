import {
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Menu, message, Table } from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PushNotifications from "services/PushNotification";
import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";

const AwardList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

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
      const res = await PushNotifications.list(params);
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
      <Restricted to="award_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/push-notifications/add-push-notification`);
  };

  const viewDetails = (row) => {
    history.push(`/app/push-notifications/edit-push-notification/${row.id}`);
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
      title: "Role",
      dataIndex: "role",
    },

    {
      title: "Send",
      dataIndex: "sent",
      render: (sent) => (sent === Number(1) ? "Yes" : "No"),
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

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
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
            <Restricted to={"award_create"}>
              <Button
                onClick={addProduct}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Create Notification
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

export default AwardList;
