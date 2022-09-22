import { Card } from "antd";
import { apexPieChartDefaultOption } from "constants/ChartConstant";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

const defaultOption = apexPieChartDefaultOption;

const Chart = (props) => {
  return <ApexChart {...props} />;
};

const DonutChartWidget = (props) => {
  const {
    width,
    height,
    title,
    extra,
    bodyClass,
    data,
    // customOptions,
    // series,
    // labels,
  } = props;

  const labels = data?.map((item) => item.browser) ?? [];
  const series = data?.map((item) => item.sessions) ?? [];
  const colors = data?.map((item) => item.color) ?? [];

  let options = defaultOption;
  options.labels = labels;
  options.plotOptions.pie.donut.labels.total.label = title;
  if (!title) {
    options.plotOptions.pie.donut.labels.show = false;
  }
  if (data) {
    options = { ...options, colors };
  }

  return (
    <Card>
      <div className={`text-center ${bodyClass}`}>
        <Chart
          type="donut"
          options={options}
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  );
};

DonutChartWidget.propTypes = {
  series: PropTypes.array.isRequired,
  labels: PropTypes.array,
  title: PropTypes.string,
  extra: PropTypes.element,
  bodyClass: PropTypes.string,
};

DonutChartWidget.defaultProps = {
  series: [],
  labels: [],
  title: "",
  height: 250,
  width: "100%",
};

export default DonutChartWidget;
