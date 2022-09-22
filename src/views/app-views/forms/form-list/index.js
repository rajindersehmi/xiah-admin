import { message, Table, Tag } from "antd";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CateogryService from "services/Category";

const ServiceList = () => {
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
      const res = await CateogryService.contact_forms(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (_, elm) =>
        elm?.category?.id ? (
          <Link to={`/app/category/edit-category/${elm?.category?.id}`}>
            <Tag color={"blue"}>{elm?.category?.name}</Tag>
          </Link>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <>
      {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
            allowClear
          />
        </div>
      </Flex> */}

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
    </>
  );
};

export default ServiceList;
