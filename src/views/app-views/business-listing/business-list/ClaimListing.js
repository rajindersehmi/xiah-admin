import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Menu, message, Modal, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { env } from "configs/EnvironmentConfig";
import useRestriction from "hooks/useRestriction";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BusinessListingService from "services/BusinessListingService";
import Restricted from "views/app-views/permissions/Restricted";
import Utils from "utils";

const { confirm } = Modal;

const ClaimListing = ({ mode }) => {
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
    is_claimed: 0,
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
      const res = await BusinessListingService.listClaims(params);
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
      <Restricted to="business_listing_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to="business_listing_delete">
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
    history.push(`/app/business-listing/add-listing`);
  };

  const viewDetails = (row) => {
    history.push(`/app/business-listing/edit-listing/${row.id}`);
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
          await BusinessListingService.delete(formdata);
          message.success("Business list deleted successfully");
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
      title: "Business name",
      dataIndex: "business_name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={env.BASE_IMG_URL + "/bussiness_listing/" + record.logo}
            name={record.business_name}
          />
        </div>
      ),
    },
    {
      title: "No. of claims",
      dataIndex: "listing_claim",
      render: (_, record) => <div>{record.listing_claim.length}</div>,
    },
    {
      title: "",
      dataIndex: "link",
      render: (lnk) => <a href={lnk}>{lnk}</a>,
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

  const downalodCsvFile = async () => {
    try {
      setIsDownloadLoading(true);
      const res = await BusinessListingService.downloadCSV(filter);
      if (res) Utils.saveAsFile(res, "plans.csv");
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
            <div className="mb-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
                allowClear
              />
            </div>
            <span>{isLoading ? "Fetching...." : null}</span>
          </Flex>
          <div>
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
              <Restricted to="business_listing_create">
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add listing
                </Button>
              </Restricted>
            </Flex>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            rowSelection={
              !isRestricted("business_listing_delete")
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

export default ClaimListing;
