import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DribbbleSquareFilled,
  FacebookFilled,
  LinkedinFilled,
  TwitterSquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import moment from "moment";
import {
  Avatar,
  Badge,
  Card,
  Col,
  List,
  Row,
  Select,
  Tag,
  message,
} from "antd";
import ChartWidget from "components/shared-components/ChartWidget";
import DonutChartWidget from "components/shared-components/DonutChartWidget";
import Flex from "components/shared-components/Flex";
import RegiondataWidget from "components/shared-components/RegiondataWidget";
import {
  apexSparklineChartDefultOption,
  COLORS,
} from "constants/ChartConstant";
import React, { useState, useEffect, useMemo } from "react";
import ApexChart from "react-apexcharts";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import utils from "utils";
import {
  conbinedSessionData,
  pagesViewData,
  sessionColor,
  sessionData,
  sessionLabels,
  socialMediaReferralData,
  uniqueVisitorsDataDay,
  uniqueVisitorsDataMonth,
  uniqueVisitorsDataWeek,
  colorData,
} from "./AnalyticDashboardData";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";

import GoogleAnalyticsService from "services/GoogleAnalytics";

// const randomColor = () => {
//   return (
//     "#" +
//     Math.floor(Math.random() * 16777215)
//       .toString(16)
//       .padStart(6, "0")
//       .toUpperCase()
//   );
// };

const randomColor = (index) => {
  return (
    "#" +
    Math.floor(index * 0.0003 * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

const WidgetsList = [
  {
    key: "new_visitor",
    label: "New Visitor",
    Icon: (
      <img
        src={require("icons/customer.svg").default}
        alt={"New Visitor"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "cyan",
    link: "/app/users",
  },
  {
    key: "returning_visiting",
    label: "Returning Visitor",
    Icon: (
      <img
        src={require("icons/customer.svg").default}
        alt={"New Visitors"}
        style={{ marginTop: "5px" }}
      />
    ),
    color: "cyan",
    link: "/app/users",
  },
];

// const socialMediaReferralIcon = [
//   <FacebookFilled style={{ color: "#1774eb" }} />,
//   <TwitterSquareFilled style={{ color: "#1c9deb" }} />,
//   <YoutubeFilled style={{ color: "#f00" }} />,
//   <LinkedinFilled style={{ color: "#0077b4" }} />,
//   <DribbbleSquareFilled style={{ color: "#e44a85" }} />,
// ];

const { Option } = Select;

export const AnalyticDashboard = () => {
  const [analyticData, setAnalyticData] = useState(null);
  // const [analyticData1, setAnalyticData1] = useState({});

  const [uniqueVisitorsData1, setUniqueVisitorsData] = useState(
    uniqueVisitorsDataWeek
  );

  const { direction } = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await GoogleAnalyticsService.getAll();

      if (res) {
        setAnalyticData(res);
        setIsLoading(false);
      }
    } catch (error) {
      message.error(error.message);
      setIsLoading(false);
    }
  };

  const newVisitor = analyticData?.userType[0]?.sessions;
  const returningVisitor = analyticData?.userType[1]?.sessions;

  const DisplayDataSet = ({ analytics }) => {
    if (!analytics) return <></>;
    return (
      <Row gutter={16}>
        {WidgetsList.map((widget) => (
          <Col xs={24} sm={24} md={6} key={widget.key}>
            <DataDisplayWidget
              icon={widget.Icon}
              value={
                widget.key === "new_visitor" ? newVisitor : returningVisitor
              }
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

  const handleVisitorsChartChange = (value) => {
    switch (value) {
      case "day":
        setUniqueVisitorsData(uniqueVisitorsDataDay);
        break;
      case "week":
        setUniqueVisitorsData(uniqueVisitorsDataWeek);
        break;
      case "month":
        setUniqueVisitorsData(uniqueVisitorsDataMonth);
        break;
      default:
        setUniqueVisitorsData(uniqueVisitorsDataWeek);
        break;
    }
  };
  const topCountry = analyticData?.getUsersByCountry[0]?.country;
  const topCountryData = analyticData?.getUsersByCountry[0]?.sessions;

  const rederRegionTopEntrance = (topCountry, topCountryData) => {
    return (
      <div className="mb-4">
        <div className="d-flex align-items-center">
          <h1 className="mb-0 ml-2 font-weight-bold">{topCountry}</h1>

          <h2 className="mb-0 ml-2 font-weight-bold">{topCountryData}</h2>
        </div>
        <span className="text-muted">Top entrance region</span>
      </div>
    );
  };

  const topBrowserData = useMemo(() => {
    const modifyData = analyticData?.topBrowser?.map((data, index) => {
      return { ...data, color: randomColor(index + 1) };
    });

    return modifyData;
  }, [analyticData]);

  const visitorData = analyticData?.totalVisitorsAndPageViews?.map(
    (item) => item.visitors
  );
  const pageViews = analyticData?.totalVisitorsAndPageViews?.map(
    (item) => item.pageViews
  );

  const uniqueVisitorsData = {
    series: [
      {
        name: "Visitors",
        data: visitorData,
      },
      {
        name: "Page Views",
        data: pageViews,
      },
    ],
    categories: analyticData?.totalVisitorsAndPageViews?.map((item) =>
      moment(item?.date ?? null).format("DD MMM")
    ),
  };

  if (isLoading) return null;

  return (
    <>
      <Row gutter={16}>
        <Col xs={24}>
          <DisplayDataSet analytics={2} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <RegiondataWidget
            title="Entrance by region"
            data={analyticData?.getUsersByCountry.slice(0, 10)}
            content={rederRegionTopEntrance(topCountry, topCountryData)}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <ChartWidget
            series={uniqueVisitorsData?.series}
            xAxis={uniqueVisitorsData?.categories}
            title="Unique Visitors and Page Views"
            height={410}
            type="bar"
            direction={direction}
            customOptions={{
              colors: [COLORS[1], COLORS[0]],
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
          <DonutChartWidget
            // series={sessionData}
            // labels={sessionLabels}
            // customOptions={{ customOptions: sessionColor }}
            data={topBrowserData}
            title="Sessions Device"
            bodyClass="my-3"
            extra={
              <Row justify="center">
                <Col xs={20} sm={20} md={20} lg={24}>
                  <div className="mt-4 mx-auto" style={{ maxWidth: 200 }}>
                    {topBrowserData?.slice(0, 10)?.map((elm) => (
                      <Flex
                        alignItems="center"
                        justifyContent="between"
                        className="mb-3"
                        key={elm.browser}
                      >
                        <div>
                          <Badge color={elm.color} />
                          <span className="text-gray-light">{elm.browser}</span>
                        </div>
                        <span className="font-weight-bold text-dark">
                          {elm.sessions}
                        </span>
                      </Flex>
                    ))}
                  </div>
                </Col>
              </Row>
            }
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
          <Card title="Most visited pages">
            <List
              itemLayout="horizontal"
              dataSource={analyticData?.mostVisitedPages.slice(0, 10)}
              renderItem={(item) => (
                <List.Item>
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div>
                      <h4 className="font-weight-bold mb-0">
                        {item.pageTitle}
                      </h4>
                      <span className="text-muted">{item.url}</span>
                    </div>
                    <div>
                      <Tag color="blue">
                        <span className="font-weight-bold">
                          <NumberFormat
                            value={item.pageViews}
                            thousandSeparator={true}
                            displayType="text"
                          ></NumberFormat>
                        </span>
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticDashboard;
