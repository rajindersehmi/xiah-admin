import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, message, Row, Table } from "antd";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useState } from "react";

import ContactFormService from "services/ContactForm";

const SubmissionLIst = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    type: "contact_us",
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
      const res = await ContactFormService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const rowCard = (_, record) => (
    <Row gutter={16}>
      <Col md={24}>
        <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
          <div>
            <p className="text-muted mb-0">Name</p>
            <p className="font-weight-bold mb-1">{record?.name ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Email:</p>
            <p className="font-weight-bold mb-1">{record?.email ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Phone:</p>
            <p className="font-weight-bold mb-1">{record?.phone ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Subject:</p>
            <p className="font-weight-bold mb-1">{record?.subject ?? "N/A"}</p>
          </div>
        </div>
      </Col>
      {record?.message && (
        <div className="bg-primary w-100">
          <p className="mb-0 mt-2 p-2 text-white">{record.message}</p>
        </div>
      )}
    </Row>
  );

  const tableColumns = [
    {
      title: "Submissions",
      dataIndex: "id",
      render: rowCard,
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
            allowClear
          />
        </div>
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
  );
};

export default SubmissionLIst;
