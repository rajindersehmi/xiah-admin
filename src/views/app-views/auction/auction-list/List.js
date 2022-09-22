import {
  DeleteOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Table,
  Radio,
  Tag,
  Select,
  Avatar,
  Rate,
} from "antd";
import Flex from "components/shared-components/Flex";
import { useSelector } from "react-redux";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import EnquiryService from "services/Enquiry";
import Utils from "utils";
import Restricted from "views/app-views/permissions/Restricted";
import CategoryService from "services/Category";
import UserService from "services/User";
import DateRangePicker from "components/shared-components/DatePicker";
import { env } from "configs/EnvironmentConfig";
const { Option } = Select;

const { confirm } = Modal;

const ServiceList = ({ enquiry_type }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [list, setList] = useState([]);
  const [partnersList, setPartnersList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    mark_for_bidding: "yes",
    enquiry_type,
    "orderBy[0][field]": "created_at",
    "orderBy[0][order]": "DESC",
    start_date: "",
    end_date: "",
  });
  const [totalData, setTotalData] = useState(0);

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { address_line_1, address_line_2, city, state, country, postcode } =
      address;
    return ` ${address_line_1 ?? ""}, ${address_line_2 ?? ""},${city ?? ""}, ${
      state ?? ""
    }, ${country ?? ""} (${postcode ?? ""})`;
  };

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

  useEffect(() => {
    fetchPartners();
    fetchCustomers();
    fetchCategories();
  }, []);

  const fetchAll = async (params) => {
    setIsLoading(true);
    try {
      const res = await EnquiryService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await EnquiryService.partnersList();
      setPartnersList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await UserService.list({
        user_type: "customer",
        perPage: 10000,
      });
      setCustomerList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list({
        user_type: "category",
        perPage: 10000,
      });
      setCategoryList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const downalodCsvFile = async () => {
    try {
      setIsDownloadLoading(true);
      const res = await EnquiryService.downloadCSV(filter);
      if (res) Utils.saveAsFile(res, "enquiry.csv");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDownloadLoading(false);
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Restricted to={"enquiry_auction_edit"}>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Edit Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to={"enquiry_auction_revert"}>
        <Menu.Item onClick={() => putBackToEnquiry(row)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">Put back to enquiry</span>
          </Flex>
        </Menu.Item>
      </Restricted>
    </Menu>
  );

  const viewDetails = (row) => {
    history.push(`/app/enquiries/edit-enquiry/${row.reference_id}`);
  };

  const putBackToEnquiry = async (row) => {
    confirm({
      title: "Do you want to remove this enquiry from auction?",
      async onOk() {
        try {
          const formdata = new FormData();
          formdata.append("price", row.bidding_price);
          formdata.append("mark_for_bidding", "no");
          await EnquiryService.putOnAuction(row.reference_id, formdata);
          message.success("Enquiry removed from auction successfully");
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };
  const theme = useSelector((state) => state.theme);

  const rowCard = (_, record) => (
    <Row
      gutter={16}
      style={{
        borderRadius: "12px",
        backgroundColor: theme.currentTheme !== "light" ? "#1b2531" : "",
        border: theme.currentTheme !== "light" ? "none" : "1px solid #e8e8e8",
      }}
    >
      <div
        style={{
          overflow: "hidden",
        }}
        className=" ml-2 w-100 d-flex flex-column flex-xl-row  mr-md-2"
      >
        <div className="w-100 w-md-50 d-flex flex-column flex-md-row pl-2  pt-2 pr-md-2 justify-content-md-between">
          <div>
            <p className="text-muted mb-0">Reference ID:</p>
            <p className="font-weight-bold text-primary mb-1">
              {record.reference_id}
            </p>
          </div>
          <div>
            <p className="text-muted mb-1">Sale Urgency</p>
            {record?.sale_urgency ? (
              <span
                style={{
                  background: "#F24865",
                  borderRadius: "4px",
                  padding: "6px",
                }}
                className="text-white"
              >
                &#11044; {record.sale_urgency ?? "N/A"}
              </span>
            ) : (
              "N/A"
            )}
          </div>
          <div>
            <p className="text-muted mb-1">Sale Type</p>
            {record?.sale_type ? (
              <span
                style={{
                  background: " #37B259",
                  borderRadius: "4px",
                  padding: "6px",
                }}
                className="text-white"
              >
                &#11044; {record.sale_type ?? "N/A"}
              </span>
            ) : (
              "N/A"
            )}
          </div>

          <div>
            <p className="text-muted mb-1">Grade</p>
            {record.sale_type ? (
              <span
                style={{
                  background: " #37B259",
                  borderRadius: "4px",
                  padding: "6px",
                }}
                className="text-white"
              >
                &#11044; {record.sale_grade ?? "N/A"}
              </span>
            ) : (
              "N/A"
            )}
          </div>
        </div>
        <div
          className="w-100 w-md-50 d-flex flex-column pt-2 pl-3 pl-md-2 pb-2 pb-md-0 flex-md-row justify-content-md-end"
          style={{ gap: 24 }}
        >
          <div>
            <p className="text-muted mb-0">Created At: </p>
            <p className="font-weight-bold mb-1">
              {moment(record?.created_at).format(DATE_FORMAT_DD_MM_YYYY)}
            </p>
          </div>

          <div>
            <p className="text-muted mb-0">Bidding Price :</p>
            <p className="font-weight-bold mb-1 text-success h2">
              {CURRENCY_SYMBOL} {record?.bidding_price ?? "NA"}
            </p>
          </div>
          <div>
            <Dropdown overlay={dropdownMenu(record)} trigger={["click"]}>
              <Button className="mt-2 d-flex align-items-center justify-content-center g-2">
                <span>More</span>
                <div className="ellipsis-dropdown">
                  <EllipsisOutlined />
                </div>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      {record?.category?.name ? (
        <div
          style={{
            height: "56px",

            width: "100%",
          }}
          className="d-flex border-top flex-column flex-md-row align-items-start align-items-md-center justify-content-start justify-content-md-between"
        >
          <Flex className="mt-3 ml-3">
            <p className="text-muted">Requirement:</p>
            <p className="font-weight-bold ml-2">{record?.category?.name}</p>
          </Flex>
        </div>
      ) : null}
      <div className="py-2 w-100 d-flex flex-column flex-xl-row px-3 border-top">
        <div className="w-100 w-md-50 pb-3 pt-1 w-md-50">
          <Flex>
            <p>Customer Details</p>
            {record?.customer ? (
              <Link to={`/app/users/edit-user/${record?.customer?.id}`}>
                <p
                  style={{
                    cursor: "pointer",
                  }}
                  className="text-primary ml-2"
                >
                  View profile
                </p>
              </Link>
            ) : null}
          </Flex>
          <div className="d-flex flex-column flex-md-row">
            {record?.customer ? (
              <Flex className="mr-4">
                <Avatar
                  src={`${env.BASE_IMG_URL}/user/${record?.customer?.profile_picture}`}
                  size={40}
                />
                <Flex className="mx-2" flexDirection="column">
                  <p className="mb-0">
                    {record.customer?.first_name} {record.customer?.last_name}{" "}
                  </p>
                  {record?.customer?.email ? (
                    <p className="mb-0">{record.customer?.email}</p>
                  ) : null}
                  {record?.customer?.phone ? (
                    <p className="mb-0">{record.customer?.phone}</p>
                  ) : null}
                </Flex>
              </Flex>
            ) : null}
            <div className="mt-1">
              <p className="font-weight-light mb-0">Address:</p>
              {record.customer_type === "not-registered" ? (
                <p className="font-weight-bold mb-1">
                  {record?.customer?.address}
                  <br />
                  {record?.customer?.street_address}
                </p>
              ) : (
                <p className="font-weight-bold mb-1">
                  {formatAddress(record?.installation_address)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* {record?.assigned_to ? (
          <div className="w-100 w-md-50">
            <Flex className="ml-3">
              <p className="mb-0">Assigned Partner Details</p>
              <Link to={`/app/partners/profile/${record?.assigned_to?.id}`}>
                <p
                  className="text-primary ml-2"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  View profile
                </p>
              </Link>
            </Flex>
            <div
              style={{ display: "flex" }}
              className="ml-2 d-flex flex-column flex-md-row"
            >
              <div style={{ display: "flex" }}>
                <Avatar
                  src={`${env.BASE_IMG_URL}/user/${record?.assigned_to?.profile_picture}`}
                  size={40}
                />

                <Flex className="mx-2" flexDirection="column">
                  <p className="mb-0">
                    {record.assigned_to?.first_name}{" "}
                    {record.assigned_to?.last_name}{" "}
                  </p>
                  {record?.assigned_to?.email ? (
                    <p className="mb-0">{record.assigned_to?.email}</p>
                  ) : null}
                  {record?.assigned_to?.phone ? (
                    <p className="mb-0">{record.assigned_to?.phone}</p>
                  ) : null}
                </Flex>
              </div>
            </div>
          </div>
        ) : (
          <Col md={6} className="mt-3 ml-2"></Col>
        )} */}
      </div>
      {record?.remarks ? (
        <div
          style={{
            height: "83px",
          }}
          className=" w-100 border-top"
        >
          <div className="d-flex mt-3 ml-3 mb-0">
            <p
              style={{ color: " #FFFFFF", opacity: "0.4" }}
              className="h5 mr-1"
            >
              Last Remarked:
            </p>
            <span className="h5">
              (by
              <span style={{ color: "#3F79F7" }} className="h6 ml-2">
                {record?.last_remark_by?.first_name ??
                  record.last_remark_by?.email ??
                  record.last_remark_by?.phone}
              </span>
              )
            </span>
          </div>
          <p className="mt-0 pb-6 ml-3">{record.remarks}</p>
        </div>
      ) : null}
      {record?.rating ? (
        <div
          style={{
            height: "83px",
            background: "#FFC542",
            borderBottomRightRadius: "12px",
            borderBottomLeftRadius: "12px",
            opacity: "0.6",
          }}
          className="d-flex border-top w-100"
        >
          <div className=" mt-3 ml-3 mb-0" style={{ zIndex: "2" }}>
            <p className="mb-0 text-light"> Customer rating:</p>
            <div>
              <Rate value={Number(record.rating)} count={5} disabled />
            </div>
          </div>
          <div className=" mt-3 ml-3 mb-0 ml-md-6 ml-lg-6">
            <p className="text-light"> Customer review:</p>
            <p>{record.rating_msg}</p>
          </div>
        </div>
      ) : null}
      {/* <div
        style={{
          borderBottom: "1px solid #3c3d40",
          overflow: "hidden",
        }}
        className=" ml-2 w-100 d-flex flex-column flex-xl-row  mr-md-2"
      >
        <div className="w-100 w-md-50 d-flex flex-column flex-md-row pl-2  pt-2 pr-md-2 justify-content-md-between">
          <div>
            <p className="text-muted mb-0">Reference ID:</p>
            <p
              className="font-weight-bold mb-1"
              style={{
                fontWeight: "600",
                fontSize: "20px",
                lineHight: "24px",
                color: "#3F79F7",
              }}
            >
              {record.reference_id}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Name:</p>
            <p className="text-muted mb-0">
              <Link to={`/app/users/edit-user/${record?.customer?.id}`}>
                {record?.customer?.first_name} {record.customer?.last_name}{" "}
              </Link>
            </p>
          </div>
        </div>
        <div className="w-100 w-md-50 d-flex flex-column pt-2 pl-3 pl-md-2 pb-2 pb-md-0 flex-md-row justify-content-md-between">
          <div>
            <p className="text-muted mb-0">Created At: </p>
            <p
              className="font-weight-bold mb-1"
              style={{ color: "whitesmoke" }}
            >
              {moment(record?.created_at).format(DATE_FORMAT_DD_MM_YYYY)}
            </p>
          </div>

          <div>
            <p className="text-muted mb-0">Purchased On</p>
            <p
              className="font-weight-bold mb-1"
              style={{ color: "whitesmoke" }}
            >
              {moment(record?.transaction?.created_at).format(
                DATE_FORMAT_DD_MM_YYYY
              )}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0" style={{ marginTop: "4px" }}>
              Bidding Price :
            </p>
            <p
              className="font-weight-bold mb-1"
              style={{ color: " #2AB930", fontSize: "24px", fontWeight: "700" }}
            >
              {record?.bidding_price ?? "NA"}
            </p>
          </div>
          <div>
            <Dropdown overlay={dropdownMenu(record)} trigger={["click"]}>
              <Button className="mt-2 d-flex align-items-center justify-content-center g-2">
                <span>More</span>
                <div className="ellipsis-dropdown">
                  <EllipsisOutlined />
                </div>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      {record?.category?.name ? (
        <div
          style={{
            height: "56px",
            borderBottom: "1px solid #3c3d40",
            width: "100%",
          }}
          className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-start justify-content-md-between"
        >
          <div className="mt-3 ml-3 d-flex">
            <p style={{ color: "white", opacity: "0.4" }} className="mr-3">
              Requirement:
            </p>
            <p>{record?.category?.name}</p>
          </div>
        </div>
      ) : null}
      <div
        style={{
          borderBottom: "1px solid #3c3d40",
          padding: "0px 20px",
        }}
        className=" w-100 d-flex flex-column flex-xl-row"
      >
        <div className="w-100 w-md-50 pb-3 pt-1 w-md-50">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "400px",
              }}
            >
              Customer Details:
            </p>
            <p
              style={{
                color: "#3F79F7",
                fontSize: "12px",
                fontWeight: "400px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            >
              view full profile
            </p>
          </div>
          <div
            style={{ display: "flex" }}
            className="d-flex flex-column flex-md-row"
          >
            <div style={{ display: "flex" }}>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={70} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <p className="font-weight-bold mb-0">
                    {record.customer_type === "registered" ? (
                      <Link to={`/app/users/edit-user/${record?.customer?.id}`}>
                        {record.customer?.first_name}{" "}
                        {record.customer?.last_name}{" "}
                      </Link>
                    ) : (
                      `${record.customer?.first_name} ${record.customer?.last_name}`
                    )}
                  </p>
                </div>
                {record.customer_type === "registered" ? (
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "#47C269",
                      marginTop: "8px",
                      marginLeft: "5px",
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "red",
                      marginTop: "8px",
                      marginLeft: "5px",
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="mt-1 d-flex-row">
              <p className="ml-4 font-weight-light h6">Address:</p>
              {record.customer_type === "not-registered" ? (
                <p className="ml-4 font-weight-bold mb-1">
                  {record?.customer?.address}
                  <br />
                  {record?.customer?.street_address}
                </p>
              ) : (
                <p className=" ml-4 font-weight-bold mb-1">
                  {formatAddress(record?.installation_address)}
                </p>
              )}
            </div>
          </div>
        </div>

        {record?.assigned_to ? (
          <div className="w-100 w-md-50">
            {" "}
            <div className="mt-2  ml-3 d-flex align-items-md-center">
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400px",
                }}
              >
                Assigned Partner Details:
              </p>
              <p
                style={{
                  color: "#3F79F7",
                  fontSize: "12px",
                  fontWeight: "400px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              >
                view full profile
              </p>
            </div>
            <div
              style={{ display: "flex" }}
              className="ml-2 d-flex flex-column flex-md-row"
            >
              <div style={{ display: "flex" }}>
                <Avatar src="https://joeschmoe.io/api/v1/random" size={70} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p className="font-weight-bold mb-0">
                      {record.assigned_to?.first_name ?? "N/A"}

                      {record.assigned_to?.last_name ?? ""}
                    </p>
                    <p className="mb-1">
                      {" "}
                      {record?.assigned_to?.phone ?? "N/A"}
                    </p>
                  </div>

                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "#47C269",
                      marginTop: "8px",
                      marginLeft: "5px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-1 d-flex-row">
                <p className="ml-4 font-weight-light h6">Email:</p>
                <p className="ml-4 "> {record?.assigned_to?.email ?? "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          <Col md={6} className="mt-3 ml-2"></Col>
        )}
      </div>
      {record?.remarks ? (
        <div
          style={{
            height: "83px",
            borderBottom: "1px solid #3c3d40",
            width: "100%",
          }}
        >
          <div className="d-flex mt-3 ml-3 mb-0">
            <p
              style={{ color: " #FFFFFF", opacity: "0.4" }}
              className="h5 mr-1"
            >
              Last Remarked:
            </p>
            <span className="h5">
              (by
              <span style={{ color: "#3F79F7" }} className="h6 ml-2">
                {record?.last_remark_by?.first_name ??
                  record.last_remark_by?.email ??
                  record.last_remark_by?.phone}
              </span>
              )
            </span>
          </div>
          <p className="mt-0 pb-6 ml-3">{record.remarks}</p>
        </div>
      ) : null}

      {record?.rating ? (
        <div
          style={{
            height: "83px",
            borderBottom: "1px solid #3c3d40",
            width: "100%",
            background: "#FFC542",
            borderBottomRightRadius: "12px",
            borderBottomLeftRadius: "12px",
            opacity: "0.3",
          }}
          className="d-flex"
        >
          <div className=" mt-3 ml-3 mb-0" style={{ zIndex: "2" }}>
            <p className="mb-0"> Customer rating:</p>
            <div>
              <Rate value={Number(record.rating)} count={5} disabled />
            </div>
          </div>
          <div className=" mt-3 ml-3 mb-0">
            <p> Customer review:</p>
            <p>{record.rating_msg}</p>
          </div>
        </div>
      ) : null} */}
      <div className="d-flex flex-column">
        {/* <Select
                placeholder="Assign lead"
                value={record.provider_id}
                onChange={(value) => assignLead(record, value)}
                disabled={!!record?.assigned_to?.id}
              >
                {partnersList?.map((partner) => (
                  <Option value={partner.id} key={partner.id}>
                    {partner?.first_name}
                    {partner?.last_name}
                  </Option>
                ))}
              </Select> */}
      </div>
      {/* <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
              <div>
                <p className="text-muted mb-0">Partner name</p>
                <p className="font-weight-bold mb-1">
                  {record?.assigned_to?.first_name ?? "N/A"}{" "}
                  {record?.assigned_to?.last_name}
                </p>
              </div>
              <div>
                <p className="text-muted mb-0">Partner email</p>
                <p className="font-weight-bold mb-1">
                  {record?.assigned_to?.email ?? "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted mb-0">Partner phone</p>
                <p className="font-weight-bold mb-1">
                  {record?.assigned_to?.phone ?? "N/A"}
                </p>
              </div>
            </div> */}
    </Row>
  );

  const tableColumns = [
    {
      title: "Info",
      dataIndex: "id",
      render: rowCard,
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  const handleDates = (dates) => {
    _onFilterChange(
      "start_date",
      dates ? moment(dates[0]).format("YYYY-MM-DD") : ""
    );
    _onFilterChange(
      "end_date",
      dates ? moment(dates[1]).format("YYYY-MM-DD") : ""
    );
  };

  return (
    <>
      <Restricted to={"enquiry_view"}>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Flex>
              {" "}
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
                allowClear
              />
            </Flex>
          </div>

          <Flex>
            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Sort By</p>
              <Radio.Group
                value={filter["orderBy[0][field]"]}
                onChange={(e) =>
                  _onFilterChange("orderBy[0][field]", e.target.value)
                }
              >
                <Radio value={"bidding_price"}>Price</Radio>
                <Radio value={"created_at"}>Date</Radio>
              </Radio.Group>
            </div>

            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Sort Order</p>
              <Radio.Group
                value={filter["orderBy[0][order]"]}
                onChange={(e) =>
                  _onFilterChange("orderBy[0][order]", e.target.value)
                }
              >
                <Radio value={"ASC"}>Asc</Radio>
                <Radio value={"DESC"}>DESC</Radio>
              </Radio.Group>
            </div>
          </Flex>
          <div className="mr-md-3 mb-3">
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
            </Flex>
          </div>
        </Flex>

        <Flex>
          <div className="mr-md-3 mb-3">
            <p className="text-muted mb-1">Partner</p>
            <Select
              value={filter?.provider_id ?? ""}
              onChange={(value) => _onFilterChange("provider_id", value)}
              placeholder="Select provider"
              style={{ minWidth: "200px" }}
            >
              <Option value="">All</Option>
              {partnersList?.map((p) => (
                <Option value={p.id}>
                  {p.first_name ?? p.email ?? p.phone}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <p className="text-muted mb-1">Customer</p>
            <Select
              value={filter?.customer_id ?? ""}
              onChange={(value) => _onFilterChange("customer_id", value)}
              placeholder="Select customer"
              style={{ minWidth: "200px" }}
            >
              <Option value="">All</Option>
              {customerList?.map((customer) => (
                <Option value={customer.id}>
                  {customer.first_name ?? customer.email ?? customer.phone}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <p className="text-muted mb-1">Category</p>
            <Select
              value={filter?.category_id ?? ""}
              onChange={(value) => _onFilterChange("category_id", value)}
              placeholder="Select category"
              style={{ minWidth: "200px" }}
            >
              <Option value="">All</Option>
              {categoryList?.map((category) => (
                <Option value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <p className="text-muted mb-1">Created At</p>
            <DateRangePicker handleDates={handleDates} />
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
      </Restricted>
    </>
  );
};

export default ServiceList;
