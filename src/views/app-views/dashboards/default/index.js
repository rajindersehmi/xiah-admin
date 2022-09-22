import { Card, Col, DatePicker, message, Row, Space, Table } from "antd";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";

import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AnalyticsService from "services/Analytics";

import AvatarStatus from "components/shared-components/AvatarStatus";
import { env } from "configs/EnvironmentConfig";
import BusinessListingService from "services/BusinessListingService";
import Restricted from "views/app-views/permissions/Restricted";

const WidgetsList = [
  {
    key: "blogs",
    label: "Blogs",
    color: "cyan",
    Icon: (
      <img
        src={require("icons/blog.svg").default}
        alt={"Blogs"}
        style={{ marginTop: "5px" }}
      />
    ),
    link: "/app/blogs",
  },
  {
    key: "brands",
    label: "Brands",
    color: "volcano",
    Icon: (
      <img
        src={require("icons/brand.svg").default}
        alt={"Brands"}
        style={{ marginTop: "5px" }}
      />
    ),
    link: "/app/brands",
  },
  {
    key: "businessListing",
    label: "Business Listing",
    color: "gold",
    Icon: (
      <img
        src={require("icons/business-listing.svg").default}
        alt={"Business Listing"}
        style={{ marginTop: "5px" }}
      />
    ),
    link: "/app/business-listing",
  },
  {
    key: "categories",
    label: "Categories",
    color: "geekblue",
    Icon: (
      <img
        src={require("icons/category.svg").default}
        alt={"Categories"}
        style={{ marginTop: "5px" }}
      />
    ),
    link: "/app/category",
  },
  {
    key: "customers",
    label: "Customers",
    Icon: (
      <img
        src={require("icons/customer.svg").default}
        alt={"Customers"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "cyan",
    link: "/app/users",
  },
  {
    key: "extraService",
    label: "Extra Services",
    Icon: (
      <img
        src={require("icons/extra-service.svg").default}
        alt={"Extra Service"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "volcano",
    link: "/app/extra-service",
  },
  {
    key: "partners",
    label: "Partners",
    Icon: (
      <img
        src={require("icons/partner.svg").default}
        alt={"Partners"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "gold",
    link: "/app/partners",
  },
  {
    key: "plans",
    label: "Plans",
    Icon: (
      <img
        src={require("icons/plans.svg").default}
        alt={"Plans"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "geekblue",
    link: "/app/plans",
  },
  {
    key: "tickets",
    label: "Tickets",
    Icon: (
      <img
        src={require("icons/tickets.svg").default}
        alt={"Tickets"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "cyan",
    link: "/app/tickets",
  },
];

const partnerCols = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Gross",
    dataIndex: "gross",
    render: (_, elm) => `${CURRENCY_SYMBOL} ${elm.gross}`,
  },
];

const claimsCols = [
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
];

const TopPartners = ({ data }) => {
  return (
    <Card title="Top Partners">
      <Table
        pagination={false}
        columns={partnerCols}
        dataSource={data}
        rowKey={(obj) => {
          return `${obj?.name} ${Math.random() * 100}`;
        }}
      />
    </Card>
  );
};
const TopCategories = ({ data }) => {
  return (
    <Card title="Top Categories">
      <Table
        pagination={false}
        columns={partnerCols}
        dataSource={data}
        rowKey={(obj) => {
          return `${obj?.name} ${Math.random() * 100}`;
        }}
      />
    </Card>
  );
};

const ClaimListingDashboard = ({ data }) => {
  return (
    <Card title="Business Listing Claims">
      <Table
        pagination={false}
        columns={claimsCols}
        dataSource={data}
        rowKey="id"
      />
    </Card>
  );
};

const DateRangePicker = ({ handleDates, dates }) => {
  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;

  const handleDateRange = (e) => {
    handleDates(e);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleDateRange} />
    </Space>
  );
};

const DisplayDataSet = ({ analytics }) => {
  if (!analytics) return <></>;
  return (
    <Row gutter={16}>
      {WidgetsList.map((widget) => (
        <Col xs={24} sm={24} md={6} key={widget.key}>
          <DataDisplayWidget
            icon={widget.Icon}
            value={analytics[widget.key]}
            title={widget.label}
            color={widget.color}
            link={widget.link}
            vertical={true}
            avatarSize={55}
          />
        </Col>
      ))}
    </Row>
  );
};

const Default = () => {
  const [topPartners, setTopPartners] = useState("");
  const [topCategories, setTopCategories] = useState("");
  const [claims, setClaims] = useState("");
  const [allCounts, setAllCounts] = useState("");
  const [dateRange, setDateRange] = useState({});

  useEffect(() => {
    fetchTopCategories();
    fetchTopPartners();
    fetchCounts();
    fetchClaims();
  }, [dateRange]);

  const fetchClaims = async (params) => {
    try {
      const res = await BusinessListingService.listClaims({
        startDate: dateRange.start_date ? dateRange.start_date : null,
        endDate: dateRange.end_date ? dateRange.end_date : null,
      });
      setClaims(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchTopCategories = async () => {
    try {
      const res = await AnalyticsService.topCategory({
        startDate: dateRange.start_date ? dateRange.start_date : null,
        endDate: dateRange.end_date ? dateRange.end_date : null,
      });
      setTopCategories(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchTopPartners = async () => {
    try {
      const res = await AnalyticsService.topPartners({
        startDate: dateRange.start_date ? dateRange.start_date : null,
        endDate: dateRange.end_date ? dateRange.end_date : null,
      });
      setTopPartners(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await AnalyticsService.count({
        startDate: dateRange.start_date ? dateRange.start_date : null,
        endDate: dateRange.end_date ? dateRange.end_date : null,
      });
      setAllCounts(res);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDates = (dates) => {
    if (dates?.length > 0) {
      setDateRange({
        start_date: moment(dates[0]).format("YYYY-MM-DD"),
        end_date: moment(dates[1]).format("YYYY-MM-DD"),
      });
    } else {
      setDateRange({});
    }
  };

  return (
    <Restricted to={"dashboard_view"}>
      <Row gutter={16}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          className="text-right mb-4"
        >
          <DateRangePicker handleDates={handleDates} dates={dateRange} />
        </Col>
        <Col xs={24}>
          <DisplayDataSet analytics={allCounts} />
        </Col>

        <Col xs={24}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <ClaimListingDashboard data={claims} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <TopPartners data={topPartners} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <TopCategories data={topCategories} />
            </Col>
          </Row>
          <p className="text-muted">
            Note: In tables above "count" represents number of enquiries and
            "gross" represents sum of the price of those enquiries the cateogory
            or partner is part of.
          </p>
        </Col>
      </Row>
    </Restricted>
  );
};

export default Default;
