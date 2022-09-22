import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  message,
  Select,
  Table,
  Tag,
  Tooltip,
} from "antd";

import Flex from "components/shared-components/Flex";

import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TransactionService from "services/Transaction";
import moment from "moment";
import UserService from "services/User";
import { env } from "../../../../configs/EnvironmentConfig";
import Utils from "utils";
import DateRangePicker from "components/shared-components/DatePicker";

const TransactionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    start_date: "",
    end_date: "",
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
    fetchCustomers();
  }, []);

  useEffect(() => {
    fetchAll(filter);
  }, [filter]);

  const fetchAll = async (params) => {
    setIsLoading(true);

    try {
      const res = await TransactionService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await UserService.list({ user_type: "partner" });
      setCustomerList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const downloadInvoice = (elm) => {};

  const tableColumns = [
    {
      title: "Invoice ID",
      dataIndex: "invoice_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, elm) => `${CURRENCY_SYMBOL} ${elm.amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, elm) =>
        elm.status ? (
          <Tag
            color={
              elm?.status.toLowerCase() === "completed" ? "success" : "error"
            }
          >
            {elm?.status}
          </Tag>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Partner",
      dataIndex: "user_id",
      render: (_, elm) =>
        elm.user?.first_name ? (
          <Link to={`/app/users/edit-user/${elm?.user_id}`}>{`${
            elm.user?.first_name
          } ${elm.user?.last_name ?? ""}`}</Link>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (_, elm) => moment(elm.created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Download Invoice",
      dataIndex: " ",
      render: (_, elm) =>
        elm?.invoice_url ? (
          <Link
            to={{ pathname: `${env.INVOICE_URL}${elm.invoice_url}` }}
            target="_blank"
          >
            <div className="d-flex align-items-center">
              <Tooltip title="Download Invoice">
                <Button
                  className="ml-2"
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={() => downloadInvoice(elm)}
                >
                  Download
                </Button>
              </Tooltip>
            </div>
          </Link>
        ) : (
          "N/A"
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
      const res = await TransactionService.downloadCSV(filter);
      if (res) Utils.saveAsFile(res, "transaction.csv");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDownloadLoading(false);
    }
  };
  const handleDates = (dates) => {
    _onFilterChange(
      "start_date",
      dates ? moment(dates[0]).format("YYYY-MM-DD") : ""
    );
    _onFilterChange(
      "end_date",
      dates ? moment(dates[1]).format("YYYY-MM-DD") : ""
    );
  };

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };
  const { Option } = Select;

  const downloadSelectedInvoices = async (row) => {
    try {
      let params = { id: selectedRows.map((r) => r.id) };

      const res = await TransactionService.downloadSelectedInvioces(params);
      if (res) Utils.saveAsFile(res, "Invoices.zip");
      setSelectedRows([]);
      message.success("Invioces Download successfully");
      setSelectedRows([]);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3" style={{ marginTop: "30px" }}>
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
                allowClear
              />
            </div>

            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Customer</p>
              <Select
                value={filter?.user_id ?? ""}
                onChange={(value) => _onFilterChange("user_id", value)}
                placeholder="Select customer"
                style={{ minWidth: "200px" }}
              >
                <Option value="">All</Option>
                {customerList?.map((customer) => (
                  <Option value={customer.id} key={customer.id}>
                    {customer.first_name ??
                      +" " + customer.last_name ??
                      customer.email ??
                      customer.phone}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Created At</p>
              <DateRangePicker
                handleDates={handleDates}
                dates={{
                  start_date: filter.start_date,
                  end_date: filter.end_date,
                }}
              />
            </div>
          </Flex>
          <Flex>
            {selectedRows.length > 0 ? (
              <Button
                onClick={downloadSelectedInvoices}
                type="primary"
                icon={<DownloadOutlined />}
                className="mr-3"
                block
              >
                Download ({selectedRows.length}) Invoices
              </Button>
            ) : null}
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

export default TransactionList;
