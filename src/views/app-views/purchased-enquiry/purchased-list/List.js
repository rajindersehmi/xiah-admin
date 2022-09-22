import {
  EyeOutlined,
  SearchOutlined,
  EllipsisOutlined,
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
  Select,
  Table,
  Tag,
  Radio,
  Rate,
  Avatar,
} from "antd";
import { env } from "configs/EnvironmentConfig";
import { connect, useDispatch, useSelector } from "react-redux";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import EnquiryService from "services/Enquiry";
import Utils from "utils";
import Restricted from "views/app-views/permissions/Restricted";
const { Option } = Select;
const { confirm } = Modal;

const statuses = ["review", "pending", "completed", "failed", "cancel"];

const ServiceList = ({ enquiry_type }) => {
  const theme = useSelector((state) => state.theme);
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const [list, setList] = useState([]);
  const [partnersList, setPartnersList] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    mark_for_bidding: "purchased",
    enquiry_type,
    "orderBy[0][field]": "created_at",
    "orderBy[0][order]": "DESC",
  });
  const [totalData, setTotalData] = useState(0);
  const user = useSelector((state) => state.auth.user);
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
    fetchPartners();
  }, [filter]);

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
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const viewDetails = (row) => {
    history.push(`/app/enquiries/edit-enquiry/${row.reference_id}`);
  };

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
        <div className="w-100 w-md-50 d-flex flex-column flex-md-row pl-2  pt-2 pr-md-2 justify-content-md-around">
          <div>
            <p className="text-muted mb-0">Reference ID:</p>
            <p className="font-weight-bold mb-1 text-primary">
              {record?.reference_id}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Urgency</p>
            <span
              style={{
                background: "#F24865",
                borderRadius: "4px",
                padding: "0px 12px",
                height: "30px",
                width: "fit-content",
              }}
              className="d-flex align-items-center justify-content-center "
            >
              <p className="text-light mb-1" style={{ color: "white" }}>
                &#11044; {record?.sale_urgency ?? "N/A"}
              </p>
            </span>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Type</p>
            <span
              style={{
                background: " #37B259",
                borderRadius: "4px",
                height: "30px",
                width: "fit-content",
                padding: "0px 6px",
              }}
              className="d-flex align-items-center justify-content-center "
            >
              <p className="text-light mb-1" style={{ color: "white" }}>
                &#11044; {record?.sale_type ?? "N/A"}
              </p>
            </span>
          </div>

          <div>
            <p className="text-muted mb-0">Grade</p>
            {record.sale_type ? (
              <span
                style={{
                  background: " #37B259",
                  borderRadius: "4px",
                  height: "30px",
                  width: "fit-content",
                  padding: "0px 6px",
                }}
                className="d-flex align-items-center justify-content-center "
              >
                <p className="font-weight-bold text-white mb-0 mx-1">
                  &#11044; {record.sale_grade ?? "N/A"}
                </p>
              </span>
            ) : (
              "N/A"
            )}
          </div>
        </div>
        <div className="w-100 w-md-50 d-flex flex-column pt-2 pl-3 pl-md-2 pb-2 pb-md-0 flex-md-row justify-content-md-around">
          <div>
            <p className="text-muted mb-0">Created At: </p>
            <p className="font-weight-bold mb-1">
              {moment(record?.created_at).format("DD MMM YYYY")}
            </p>
          </div>

          <div>
            <p className="text-muted mb-0">Completed On</p>
            {record.completed_at ? (
              <span
                style={{
                  background: " #37B259",
                  borderRadius: "4px",
                  height: "30px",
                  width: "auto",
                  padding: "0px 12px",
                }}
                className="d-flex align-items-center justify-content-center "
              >
                <p className="font-weight-bold  mb-0 mx-1">
                  &#11044; {moment(record?.completed_at).format("DD MMM YYYY")}
                </p>
              </span>
            ) : (
              "N/A"
            )}
          </div>

          <div>
            <p className="text-muted mb-0">Purchased On</p>
            <p className="font-weight-bold mb-1">
              {moment(record?.transaction?.created_at).format("DD MMM YYYY")}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Bidding Price :</p>
            <p
              className="font-weight-bold mb-1"
              style={{ color: " #2AB930", fontSize: "24px", fontWeight: "700" }}
            >
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
            width: "100%",
          }}
          className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-start justify-content-md-between "
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

        {record?.assigned_to ? (
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
          <Col md={6} className="mt-3 ml-2">
            <div className="d-flex flex-column">
              <Restricted to="enquiry_assign">
                <Select
                  placeholder="Assign lead"
                  value={record.provider_id}
                  onChange={(value) => assignLead(record, value)}
                >
                  {partnersList?.map((partner) => (
                    <Option value={partner.id}>
                      {partner?.first_name}
                      {partner?.last_name}
                    </Option>
                  ))}
                </Select>
              </Restricted>
            </div>
          </Col>
        )}
      </div>
      {record?.remarks ? (
        <div className="border-top w-100">
          <div className="mt-3 ml-3 mb-0">
            <p className="h5 mr-1">
              Last Remarked: ( by
              <span className="text-primary ml-2">
                {record?.last_remark_by?.first_name ??
                  record.last_remark_by?.email ??
                  record.last_remark_by?.phone ??
                  "N/A"}
              </span>
              )
            </p>
          </div>
          <p className="mt-0 pb-6 ml-3">{record.remarks}</p>
        </div>
      ) : null}

      {record?.rating ? (
        <div
          style={{
            background: "#423d24",
            borderBottomRightRadius: "12px",
            borderBottomLeftRadius: "12px",
          }}
          className="d-flex w-100 py-2"
        >
          <div className=" mt-3 ml-3 mb-0" style={{ zIndex: "2" }}>
            <p className="mb-0 text-light"> Customer rating:</p>
            <div>
              <Rate value={Number(record.rating)} count={5} disabled />
            </div>
          </div>
          <div className="mt-3 ml-3 mb-0 ml-md-6 ml-lg-6">
            <p className="text-light mb-0">Customer review:</p>
            <p className="mb-0 font-weight-bold text-light">
              {record.rating_msg}
            </p>
          </div>
        </div>
      ) : null}

      {/* //rating and review end// */}
      {/* <Col md={18}>
        <div
          className="d-flex flex-column flex-md-row mb-2"
          style={{ gap: 20 }}
        >
          <div>
            <p className="text-muted mb-0">Reference ID:</p>
            <p className="font-weight-bold mb-1">{record.reference_id}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Name:</p>
            <p className="font-weight-bold mb-1">
              {record.customer_type === "registered" ? (
                <Link to={`/app/users/edit-user/${record?.customer?.id}`}>
                  {record.customer?.first_name} {record.customer?.last_name}{" "}
                </Link>
              ) : (
                `${record.customer?.first_name} ${record.customer?.last_name}`
              )}{" "}
              <Tag color={"blue"}>{Utils.humanize(record?.customer_type)}</Tag>
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Contact:</p>
            <p className="font-weight-bold mb-1 ">
              {record?.customer?.phone ? (
                <a href={`tel:${record.customer.phone}`}>
                  {record.customer?.phone}
                </a>
              ) : (
                "NA"
              )}
            </p>
          </div>
          {record?.category?.name && (
            <div>
              <p className="text-muted mb-0">Category:</p>
              <p className="font-weight-bold mb-1 ">{record?.category?.name}</p>
            </div>
          )}
        </div>
        <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
          <div>
            <p className="text-muted mb-0">Address: </p>
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
          <div>
            <p className="text-muted mb-0">Created At: </p>
            <p className="font-weight-bold mb-1">
              {moment(record?.created_at).format(DATE_FORMAT_DD_MM_YYYY)}
            </p>
          </div>
          {record.last_remark_by && (
            <div>
              <p className="text-muted mb-0">Last Remark by:</p>
              <p className="font-weight-bold mb-1">
                {record?.last_remark_by?.first_name ??
                  record.last_remark_by.email ??
                  record.last_remark_by?.phone}
              </p>
            </div>
          )}
          {record?.transaction?.created_at && (
            <div>
              <p className="text-muted mb-0">Pusrchased On</p>
              <p className="font-weight-bold mb-1">
                {moment(record?.transaction?.created_at).format(
                  DATE_FORMAT_DD_MM_YYYY
                )}
              </p>
            </div>
          )}
        </div>
        <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
          <div>
            <p className="text-muted mb-0">Sale Urgency</p>
            <p className="font-weight-bold mb-1">
              {record.sale_urgency ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Type</p>
            <p className="font-weight-bold mb-1">{record.sale_type ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Grade</p>
            <p className="font-weight-bold mb-1">
              {record.sale_grade ?? "N/A"}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
          <div>
            <p className="text-muted mb-0">Partner name</p>
            <p className="font-weight-bold mb-1">
              {record.assigned_to?.first_name ?? "N/A"}

              {record.assigned_to?.last_name ?? ""}
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
        </div>
      </Col> */}
      {/* <Col md={6}>
        <div className="d-flex flex-column">
          <h4 className="text-primary mb-2 ">
            <span className="text-muted"> Bidding Price :</span>{" "}
            {CURRENCY_SYMBOL} {record?.bidding_price ?? "NA"}
          </h4>

          <Dropdown overlay={dropdownMenu(record)} trigger={["click"]}>
            <Button className="mt-2 d-flex align-items-center justify-content-center g-2">
              <span>More</span>
              <div className="ellipsis-dropdown">
                <EllipsisOutlined />
              </div>
            </Button>
          </Dropdown>
        </div>
      </Col> */}
      {/* {record.remarks && (
        <div className=" w-100">
          <p className="mb-0 p-2 text-white">Remark: {record.remarks}</p>
        </div>
      )}
      {record?.rating && (
        <div
          className="w-100 p-2 rounded-sm mt-2"
          style={{ background: "rgb(255, 197, 66,0.15)" }}
        >
          <p className="font-weight-bold text-muted m-0">Customer Rating :</p>
          <Rate value={Number(record.rating)} count={5} disabled />
          <span className="mx-1 text-muted">({record.rating})</span>
          {record?.rating_msg && (
            <p className="my-1  text-warning font-weight-bold">
              {record.rating_msg}
            </p>
          )}
        </div>
      )} */}
    </Row>
  );

  const assignLead = (row, value) => {
    if (!value) return;
    const assignFormData = new FormData();
    const auctionFormData = new FormData();
    assignFormData.append("partner_id", value);
    auctionFormData.append("price", row.bidding_price);

    confirm({
      content: `Did this partner (${value}) has paid for this lead or not`,
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        try {
          const res = EnquiryService.assignLead(
            row.reference_id,
            assignFormData
          );
          if (res) {
            auctionFormData.append("mark_for_bidding", "purchased");
            await EnquiryService.putOnAuction(
              row.reference_id,
              auctionFormData
            );
            message.success("Enquiry assigned successfully");
          }
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      async onCancel() {
        try {
          const res = EnquiryService.assignLead(
            row.reference_id,
            assignFormData
          );
          if (res) {
            auctionFormData.append("mark_for_bidding", "no");
            await EnquiryService.putOnAuction(
              row.reference_id,
              auctionFormData
            );
            message.success("Enquiry assigned successfully");
          }
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
    });
  };

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

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        mobileFlex={false}
        style={{ paddingBottom: "200px" }}
      >
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
            allowClear
          />
        </div>

        <div className="mr-md-3 mb-3">
          <Select
            value={filter?.provider_id ?? ""}
            onChange={(value) => _onFilterChange("provider_id", value)}
            placeholder="Select provider"
            style={{ minWidth: "200px" }}
          >
            <Option value="">All Partners</Option>
            {partnersList?.map((p) => (
              <Option value={p.id}>
                {`${p.first_name} ${p.last_name}` ?? p.email ?? p.phone}
              </Option>
            ))}
          </Select>
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
              <Radio value={"created_at"}>Create Date</Radio>
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
