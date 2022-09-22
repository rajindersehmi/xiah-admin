import {
  BarChartOutlined,
  FileDoneOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Badge, Card, Col, DatePicker, message, Row, Space } from "antd";

import ChartWidget from "components/shared-components/ChartWidget";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import Flex from "components/shared-components/Flex";
import { COLORS } from "constants/ChartConstant";

import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import AnalyticsService from "services/Analytics";
import { default as Utils } from "utils";

const Revenue = ({ data }) => {
  const { direction } = useSelector((state) => state.theme);

  const dates =
    (() => {
      if (!data?.enquiries?.length) return;
      return data.enquiries.map((e) => e.date);
    },
    [data.enquiries]);

  const dataPoints = useMemo(() => {
    if (!data?.enquiries?.length) return;
    const list = [
      {
        name: "sum",
        data: data.enquiries.map((e) => e.sum),
      },
    ];
    return list;
  }, [data.enquiries]);

  if (!data) return null;

  return (
    <Card>
      <div>
        <h1 className="font-weight-bold">
          {CURRENCY_SYMBOL} {data?.sum ?? 0}
        </h1>
        <p>Total gross income figure based from the date range given above.</p>
      </div>
      <ChartWidget
        card={false}
        series={dataPoints}
        xAxis={dates[0].map((ele) => ele.date)}
        title="Unique Visitors"
        height={250}
        type="bar"
        customOptions={{ colors: COLORS }}
        direction={direction}
      />
    </Card>
  );
};

const DisplayDataSet = ({ analytics }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={6}>
      <DataDisplayWidget
        icon={<FileDoneOutlined />}
        value={analytics?.completed}
        title="Completed Enquiries"
        color="cyan"
        vertical={true}
        avatarSize={55}
      />
    </Col>
    <Col xs={24} sm={24} md={6}>
      <DataDisplayWidget
        icon={<BarChartOutlined />}
        value={analytics?.pending}
        title="Ongoing Enquries"
        color="gold"
        vertical={true}
        avatarSize={55}
      />
    </Col>
    <Col xs={24} sm={24} md={6}>
      <DataDisplayWidget
        icon={<SyncOutlined />}
        value={analytics?.assigned}
        title="Assigned Enquiries"
        color="blue"
        vertical={true}
        avatarSize={55}
      />
    </Col>
    <Col xs={24} sm={24} md={6}>
      <DataDisplayWidget
        icon={<UserSwitchOutlined />}
        value={analytics?.purchase}
        title="Purchase Enquiries"
        color="volcano"
        vertical={true}
        avatarSize={55}
      />
    </Col>{" "}
  </Row>
);

const EnquiriesChart = ({ data }) => {
  const { direction } = useSelector((state) => state.theme);
  const pointsLabel = ["completed", "pending", "assigned", "purchase"];

  const dates = useMemo(() => {
    if (!data?.enquiries?.length) return;
    return data.enquiries.map((e) => e.date);
  }, [data.enquiries]);

  const dataPoints = useMemo(() => {
    if (!data?.enquiries?.length) return;

    const list = [
      {
        name: "completed",
        data: data.enquiries.map((e) => e.completed),
      },
      {
        name: "assigned",
        data: data.enquiries.map((e) => e.assigned),
      },
      {
        name: "purchase",
        data: data.enquiries.map((e) => e.purchase),
      },
      {
        name: "pending",
        data: data.enquiries.map((e) => e.pending),
      },
    ];

    return list;
  }, [data.enquiries]);

  if (!data) return null;

  return (
    <Card title="Enquiries">
      <Flex>
        {pointsLabel.map((l, i) => (
          <div className="mr-5" key={i}>
            <h2 className="font-weight-bold mb-1">{data[l]}</h2>
            <p>
              <Badge color={COLORS[i]} />
              {Utils.humanize(l)}
            </p>
          </div>
        ))}
      </Flex>
      <div>
        <ChartWidget
          card={false}
          series={dataPoints}
          xAxis={dates}
          height={280}
          direction={direction}
          customOptions={{
            colors: pointsLabel.map((l, i) => COLORS[i]),
            legend: {
              show: false,
            },
            stroke: {
              width: 2.5,
              curve: "smooth",
            },
          }}
        />
      </div>
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

const SalesDashboard = () => {
  const [analyticData, setAnalyticData] = useState("");
  const [analyticDaysData, setAnalyticDaysData] = useState("");
  const [revenue, setRevenue] = useState("");
  const [dateRange, setDateRange] = useState({});

  useEffect(() => {
    fetchAnalytics();
    fetchAnalyticDays();
    fetchRevenue();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const res = await AnalyticsService.get({
        startDate: dateRange.start_date ? dateRange.start_date : null,
        endDate: dateRange.end_date ? dateRange.end_date : null,
      });
      setAnalyticData(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchAnalyticDays = async () => {
    try {
      const res = await AnalyticsService.days({
        startDate: dateRange.start_date
          ? dateRange.start_date
          : moment().startOf("month").format("YYYY-MM-DD"),
        endDate: dateRange.end_date
          ? dateRange.end_date
          : moment().endOf("month").format("YYYY-MM-DD"),
      });
      setAnalyticDaysData(res);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await AnalyticsService.revenue({
        startDate: dateRange.start_date
          ? dateRange.start_date
          : moment().startOf("month").format("YYYY-MM-DD"),
        endDate: dateRange.end_date
          ? dateRange.end_date
          : moment().endOf("month").format("YYYY-MM-DD"),
      });
      setRevenue(res);
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
    <>
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
          <Revenue data={revenue} />
        </Col>
        <Col xs={24}>
          <DisplayDataSet analytics={analyticData} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <EnquiriesChart data={analyticDaysData} />
        </Col>
      </Row>
    </>
  );
};

export default SalesDashboard;
