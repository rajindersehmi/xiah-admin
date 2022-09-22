import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Menu, message, Modal, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { env } from "configs/EnvironmentConfig";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AwardService from "services/Award";

import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";
import useRestriction from "hooks/useRestriction";

const { confirm } = Modal;

const AwardList = () => {
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
      const res = await AwardService.list(params);
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
      <Restricted to="award_delete">
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
    history.push(`/app/awards/add-award`);
  };

  const viewDetails = (row) => {
    history.push(`/app/awards/edit-award/${row.id}`);
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
          await AwardService.delete(formdata);
          message.success("Award deleted successfully");
          setSelectedRows([]);
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
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={env.BASE_IMG_URL + "/awards/" + record.image}
            name={record.name}
          />
        </div>
      ),
    },
    {
      title: "Award type",
      dataIndex: "award_type",
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
            <span>{isLoading ? "Fetching..." : null}</span>
          </Flex>
          <Flex>
            {selectedRows.length > 0 ? (
              <Restricted to={"award_delete"}>
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
            <Restricted to={"award_create"}>
              <Button
                onClick={addProduct}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add Award
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
              !isRestricted("award_delete")
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

export default AwardList;
