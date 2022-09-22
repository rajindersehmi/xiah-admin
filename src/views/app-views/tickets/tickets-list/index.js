import {
  CheckOutlined,
  MessageOutlined,
  PlusCircleOutlined,
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
  Tooltip,
  Select,
} from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TicketService from "services/Tickets";

import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";
import useRestriction from "hooks/useRestriction";

const { confirm } = Modal;
const { Option } = Select;

const related_to = [
  "Payment related",
  "Order related",
  "Provider related",
  "Other",
];

const TicketList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isRestricted = useRestriction();
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    status: "active",
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
      const res = await TicketService.list(params);
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
      <Menu.Item onClick={() => viewConversations(row)}>
        <Flex alignItems="center">
          <MessageOutlined />
          <span className="ml-2">Conversations</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/tickets/add-ticket`);
  };

  const viewConversations = (row) => {
    history.push(`/app/tickets/messages/${row.id}`);
  };
  const updateStatus = async (row) => {
    confirm({
      title: "Do you want to Change status as closed?",
      content: "When the OK button is clicked, the ticket will be closed",
      async onOk() {
        try {
          const formdata = new FormData();
          if (selectedRows.length > 0) {
          } else {
            formdata.append("status", "closed");
          }
          await TicketService.updateStatus(row.id, formdata);
          message.success("Ticked Closed");
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
      title: "Ref ID",
      dataIndex: "ref_id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Related To",
      dataIndex: "related_to",
    },
    {
      title: "User",
      dataIndex: "user_id",
      render: (_, record) => {
        return (
          <Link to={`/app/users/edit-user/${record.user?.id}`}>
            {record.user?.first_name} {record.user?.last_name}
          </Link>
        );
      },
    },
    {
      title: "Enquiry",
      dataIndex: "title",
      render: (_, record) => {
        return (
          <Link
            to={`/app/enquiries/edit-enquiry/${record.enquiry?.reference_id}`}
          >
            {record.enquiry?.reference_id}
          </Link>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) =>
        record?.status === "active" ? (
          <Tag color="gold">{record?.status}</Tag>
        ) : (
          <Tag color="green">{record?.status}</Tag>
        ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex align-items-center justify-content-end">
          {elm?.status === "active" && (
            <Tooltip title="Change Status">
              <Button
                type="primary"
                className="mr-2"
                icon={<CheckOutlined />}
                onClick={() => updateStatus(elm)}
                size="small"
              />
            </Tooltip>
          )}

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

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3">
              <Radio.Group
                value={filter?.status}
                onChange={(e) => _onFilterChange("status", e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="">All</Radio.Button>
                <Radio.Button value="active">Active</Radio.Button>
                <Radio.Button value="closed">Closed</Radio.Button>
              </Radio.Group>
            </div>
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => _onFilterChange("q", e.target.value)}
              />
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                value={filter?.related_to ?? ""}
                onChange={(value) => _onFilterChange("related_to", value)}
                style={{ minWidth: "100px" }}
                placeholder="Related To"
              >
                <Option value="">All</Option>
                {related_to.map((i) => (
                  <Option value={i}>{i}</Option>
                ))}
              </Select>
            </div>
          </Flex>
          <Flex>
            {/* {selectedRows.length > 0 ? (
              <Button
                onClick={deleteRow}
                type="danger"
                icon={<DeleteOutlined />}
                className="mr-3"
                block
              >
                Delete ({selectedRows.length})
              </Button>
            ) : null} */}
            <div>
              <Restricted to="ticket_create">
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Create Ticket
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
              !isRestricted("ticket_delete")
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

export default TicketList;
