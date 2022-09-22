import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, message, Row, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ContactFormService from "services/ContactForm";

const emojiBasedOnFeedback = (feedback) => {
  switch (Number(feedback)) {
    case 1:
      return {
        src: "../../../../../img/hate.png",
        alt: "Hate",
      };
    case 2:
      return {
        src: "../../../../../img/dislike.png",
        alt: "Dislike",
      };
    case 3:
      return {
        src: "../../../../../img/neutral.png",
        alt: "Neutral",
      };
    case 4:
      return {
        src: "../../../../../img/like.png",
        alt: "Like",
      };
    case 5:
      return {
        src: "../../../../../img/love.png",
        alt: "Love",
      };
    default:
      return null;
  }
};

const SubmissionLIst = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    type: "feedback",
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
    <>
      <Row
        gutter={16}
        style={{
          borderRadius: "12px",
          backgroundColor: theme.currentTheme !== "light" ? "#1b2531" : "",
          border: theme.currentTheme !== "light" ? "none" : "1px solid #e8e8e8",
        }}
      >
        <Col md={24} className="py-2">
          <div className="d-flex flex-column flex-md-row" style={{ gap: 24 }}>
            <div>
              <p className="text-muted mb-1">Name</p>
              <p className="font-weight-bold ">{record?.name ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Email:</p>
              <p className="font-weight-bold">{record?.email ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Phone:</p>
              <p className="font-weight-bold">{record?.phone ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Subject:</p>
              <p className="font-weight-bold">{record?.subject ?? "N/A"}</p>
            </div>
            {!(`${record.feedback}` === "null") && (
              <div>
                <p className="text-muted mb-1">Customer Feedback</p>
                <AvatarStatus
                  src={emojiBasedOnFeedback(record?.feedback)?.src}
                  alt={emojiBasedOnFeedback(record?.feedback)?.alt}
                  name={emojiBasedOnFeedback(record?.feedback)?.alt}
                />
              </div>
            )}
          </div>
        </Col>
        {record?.message && (
          <div className="border-top w-100 p-2 mt-2">
            <p className="mb-0 text-muted">Feedback message</p>
            <p className="mb-0 font-weight-bold">{record?.message}</p>
          </div>
        )}
      </Row>
    </>
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
          className="enquiry-table"
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
