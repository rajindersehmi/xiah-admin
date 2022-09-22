import moment from "moment";
const { Space, DatePicker } = require("antd");

const DateRangePicker = ({ handleDates, dates }) => {
  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;

  const handleDateRange = (e) => {
    handleDates(e);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleDateRange} defaultValue={null} />
    </Space>
  );
};

export default DateRangePicker;
