import {
  EllipsisOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Select,
  Table,
  Form,
  Row,
  Col,
  Rate,
  Avatar,
  Typography,
} from "antd";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import EnquiryService from "services/Enquiry";
import moment from "moment";

import UserService from "services/User";
import TextArea from "antd/lib/input/TextArea";
import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import Utils from "utils";
import { env } from "configs/EnvironmentConfig";
import { useSelector } from "react-redux";
import PlanService from "services/Plan";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import Restricted from "views/app-views/permissions/Restricted";
import CategoryService from "services/Category";
import DateRangePicker from "components/shared-components/DatePicker";
const { Option } = Select;
const { confirm } = Modal;

const { Text, Title } = Typography;

const statuses = [
  {
    name: "In Review",
    key: "review",
  },
  {
    name: "In Progress",
    key: "pending",
  },
  {
    name: "Completed",
    key: "completed",
  },
  {
    name: "Failed",
    key: "failed",
  },
  {
    name: "Cancelled",
    key: "cancelled",
  },
];

const ServiceList = ({ enquiry_type }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [auctionModal, setAuctionModal] = useState({
    show: false,
    enquiry_id: null,
  });
  const [remarkModal, setRemarkModal] = useState({
    show: false,
    enquiry_id: null,
  });

  const [plansModal, setPlansModal] = useState({
    show: false,
    enquiry_id: null,
  });
  const theme = useSelector((state) => state.theme);
  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { address_line_1, address_line_2, city, state, country, postcode } =
      address;
    return ` ${
      address_line_1 === "null"
        ? ""
        : address_line_1 && address_line_1
        ? address_line_1
        : ""
    }, ${
      address_line_2 === "null"
        ? ""
        : address_line_2 && address_line_2
        ? address_line_2
        : ""
    },${city === "null" ? "" : city && city ? city : ""}, ${
      state === "null" ? "" : state && city ? city : ""
    }, ${country === "null" ? "" : country && country ? country : ""} (${
      postcode === "null" ? "" : postcode && postcode ? postcode : ""
    })`;
  };

  const [list, setList] = useState([]);
  const [partnersList, setPartnersList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [plans, setPlans] = useState([]);

  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    status: "review",
    mark_for_bidding: "no",
    "orderBy[0][field]": "created_at",
    "orderBy[0][order]": "DESC",
    enquiry_type,
    start_date: "",
    end_date: "",
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

  useEffect(() => {
    fetchPartners();
    fetchCustomers();
    fetchCategories();
    fetchPlans();
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
  const fetchPlans = async () => {
    try {
      const res = await PlanService.list({
        user_type: "category",
        perPage: 10000,
      });
      setPlans(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Restricted to={"enquiry_edit"}>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Edit Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      {(enquiry_type === "category" || enquiry_type === "extra_services") &&
        !row?.provider_id && (
          <Restricted to={"enquiry_auction"}>
            <Menu.Item onClick={() => _openAuctionModal(row)}>
              <Flex alignItems="center">
                <EyeOutlined />
                <span className="ml-2">Put on auction</span>
              </Flex>
            </Menu.Item>
          </Restricted>
        )}
      <Restricted to={"enquiry_remark"}>
        <Menu.Item onClick={() => _addRemark(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Add Remark</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      {enquiry_type === "requirement" && (
        <Menu.Item onClick={() => _addPlans(row)}>
          <Flex alignItems="center">
            <PlusCircleOutlined />
            <span className="ml-2">Assign Plans</span>
          </Flex>
        </Menu.Item>
      )}
      {filter.status !== "cancelled" ? (
        <Restricted to={"enquiry_mark"}>
          <Menu.Item onClick={() => cancelEnquiry(row)}>
            <Flex alignItems="center">
              <CloseOutlined />
              <span className="ml-2">Mark as Cancelled</span>
            </Flex>
          </Menu.Item>
        </Restricted>
      ) : null}
    </Menu>
  );

  const addEnquiry = () => {
    history.push(`/app/enquiries/add-enquiry`);
  };

  const viewDetails = (row) => {
    history.push(`/app/enquiries/edit-enquiry/${row.reference_id}`);
  };

  const cancelEnquiry = async (row) => {
    confirm({
      title: "Do you want to cancel?",
      content: "When clicked the OK button, this enquiry will we cancelled",
      async onOk() {
        try {
          await EnquiryService.cancelEnquiry(row.reference_id);
          message.success("Enquiry cancelled successfully");
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const _openAuctionModal = (data) =>
    setAuctionModal({ show: true, enquiry_id: data.reference_id });

  const _closeAuctionModal = () =>
    setAuctionModal({ show: false, enquiry_id: null, price: null });

  const _addRemark = (row) =>
    setRemarkModal({ show: true, enquiry_id: row.reference_id });

  const _closeRemarkModal = () =>
    setRemarkModal({ show: false, enquiry_id: null });

  const _addPlans = (row) => setPlansModal({ show: true, enquiry_id: row.id });

  const _closePlansModal = () =>
    setPlansModal({ show: false, enquiry_id: null });

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
        className="ml-2 w-100 d-flex flex-column flex-xl-row  mr-md-2"
      >
        <div className="w-100 w-md-50 d-flex flex-column flex-md-row pl-2  pt-2 pr-md-2 justify-content-md-between">
          <div>
            <p className="text-muted mb-1">Reference ID:</p>
            <p className="h3 font-weight-bold text-primary">
              {record.reference_id}
            </p>
          </div>
        </div>
        <div className="w-100 w-md-50 d-flex flex-column pt-2 pl-3 pl-md-2 pb-2 pb-md-0 flex-md-row justify-content-md-between">
          <div>
            <p className="text-muted mb-0">Created At</p>
            <p className="font-weight-bold mb-1">
              {moment(record?.created_at).format(DATE_FORMAT_DD_MM_YYYY)}
            </p>
          </div>

          <div>
            <p className="text-muted mb-0">Last update on</p>
            <p className="font-weight-bold mb-1">
              {moment(record?.updated_at).format(DATE_FORMAT_DD_MM_YYYY)}
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
                  width: "fit-content",
                  padding: "0px 12px",
                }}
                className="d-flex align-items-center justify-content-center "
              >
                <p className="font-weight-bold text-white mb-0 mx-1">
                  &#11044;{" "}
                  {moment(record?.completed_at).format(DATE_FORMAT_DD_MM_YYYY)}
                </p>
              </span>
            ) : (
              "N/A"
            )}
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
      {record?.plan_purchase?.name ? (
        <div
          style={{
            width: "100%",
          }}
          className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-start justify-content-md-between "
        >
          <Flex className="mt-3 ml-3">
            <p className="text-muted">Requirement:</p>
            <p className="font-weight-bold ml-2">
              {record?.plan_purchase?.name}
            </p>
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
            {enquiry_type === "extra_services" ? (
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
            ) : (
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
            )}
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
              <Select
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
              </Select>
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
    </Row>
  );

  const assignLead = (row, value) => {
    if (!value) return;
    confirm({
      content: "When clicked the OK button, this enquiry will we assigned",
      async onOk() {
        try {
          const formdata = new FormData();
          formdata.append("partner_id", value);
          await EnquiryService.assignLead(row.reference_id, formdata);
          message.success("Enquiry assigned successfully");
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
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

  const downalodCsvFile = async () => {
    const { perPage, ...rest } = filter;
    try {
      setIsDownloadLoading(true);
      const res = await EnquiryService.downloadCSV(rest);
      if (res) Utils.saveAsFile(res, "enquiry.csv");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDownloadLoading(false);
    }
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false} alignItems="center">
          <div className="mr-md-3 mb-3">
            <Radio.Group
              value={filter.status}
              onChange={(e) => _onFilterChange("status", e.target.value)}
              buttonStyle="solid"
            >
              {statuses.map((status) => (
                <Radio.Button value={status.key}>{status.name}</Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
              allowClear
            />
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
            <Restricted to={"enquiry_create"}>
              <Button
                onClick={addEnquiry}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                New
              </Button>
            </Restricted>
          </Flex>
        </div>
      </Flex>
      <Flex alignItems="center" justifyContent="between">
        {(enquiry_type === "category" ||
          enquiry_type === "extra_services" ||
          enquiry_type === "plan_purchase") && (
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
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
            {enquiry_type === "plan_purchase" ? (
              <>
                {" "}
                <div className="mr-md-3 mb-3">
                  <p className="text-muted mb-1">Plans</p>
                  <Select
                    value={filter?._type_id ?? ""}
                    onChange={(value) =>
                      _onFilterChange("enquiry_type_id", value)
                    }
                    placeholder="Select category"
                    style={{ width: "200px" }}
                  >
                    <Option value="">All</Option>
                    {plans?.map((plan) => (
                      <Option value={plan.id}>{plan.name}</Option>
                    ))}
                  </Select>
                </div>
              </>
            ) : (
              <div className="mr-md-3 mb-3">
                <p className="text-muted mb-1">Category</p>
                <Select
                  value={filter?.enquiry_type_id ?? ""}
                  onChange={(value) =>
                    _onFilterChange("enquiry_type_id", value)
                  }
                  placeholder="Select category"
                  style={{ minWidth: "200px" }}
                >
                  <Option value="">All</Option>
                  {categoryList?.map((category) => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>
              </div>
            )}
            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Created At</p>
              {/*<Radio.Group
                value={filter["orderBy[0][order]"]}
                onChange={(e) =>
                  _onFilterChange("orderBy[0][order]", e.target.value)
                }
              >
                <Radio value={"ASC"}>Asc</Radio>
                <Radio value={"DESC"}>DESC</Radio>
              </Radio.Group> */}
              <DateRangePicker
                handleDates={handleDates}
                dates={{
                  start_date: filter.start_date,
                  end_date: filter.end_date,
                }}
              />
            </div>
          </Flex>
        )}
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

      <PutOnAuctionModal
        auctionModal={auctionModal}
        _closeAuctionModal={_closeAuctionModal}
        fetchAll={fetchAll}
        filter={filter}
      />

      <AddRemarkModal
        _closeRemarkModal={_closeRemarkModal}
        fetchAll={fetchAll}
        remarkModal={remarkModal}
        filter={filter}
      />

      <AddPlansModal
        _closeRemarkModal={_closePlansModal}
        fetchAll={fetchAll}
        remarkModal={plansModal}
        filter={filter}
      />
    </>
  );
};

const PutOnAuctionModal = ({
  auctionModal,
  _closeAuctionModal,
  fetchAll,
  filter,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const putOnAuction = async () => {
    form
      .validateFields()
      .then((values) => {
        setIsLoading(true);
        const formdata = new FormData();
        for (let k in values) if (values[k]) formdata.append(k, values[k]);
        formdata.append("mark_for_bidding", "yes");
        EnquiryService.putOnAuction(auctionModal.enquiry_id, formdata).then(
          (res) => {
            if (res) {
              message.success("Enqiry put on auction successfully");
              fetchAll(filter);
              setIsLoading(false);
              _closeAuctionModal();
            }
          }
        );
      })
      .catch((err) => message.error(err.message));
  };

  const _onClose = () => {
    _closeAuctionModal();
    form.setFieldsValue({});
  };
  return (
    <Modal
      visible={auctionModal.show}
      onOk={putOnAuction}
      onCancel={() => _onClose()}
      confirmLoading={isLoading}
    >
      <p>Click OK to put enquiry for auction</p>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="price"
              label="Bid Price"
              rules={[
                {
                  required: true,
                  message: "Bid price is required",
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Enter a number",
                },
              ]}
            >
              <Input
                type={"number"}
                prefix={<div>{CURRENCY_SYMBOL}</div>}
                placeholder="Enter bid price"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="sale_urgency"
              label="Urgency"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Input placeholder="Enter urgency" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="sale_type"
              label="Sale type"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Input placeholder="Enter sale type" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="sale_grade"
              label="Sale Grade"
              rules={[{ required: true, message: "Fill this field" }]}
            >
              <Input placeholder="Enter sale grade" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="remarks" label="Remark">
          <TextArea placeholder="Enter the remark" prefix="hell" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRemarkModal = ({
  remarkModal,
  _closeRemarkModal,
  fetchAll,
  filter,
}) => {
  const [form] = Form.useForm();

  const _addRemark = async () => {
    form
      .validateFields()
      .then((values) => {
        const formdata = new FormData();
        formdata.append("remarks", values.remarks);
        EnquiryService.addRemark(remarkModal.enquiry_id, formdata).then(
          (res) => {
            if (res) {
              message.success("Remark added successfully");
              fetchAll(filter);
              _closeRemarkModal();
            }
          }
        );
      })
      .catch((err) => message.error(err.message));
  };
  return (
    <Modal
      visible={remarkModal.show}
      onOk={_addRemark}
      onCancel={_closeRemarkModal}
    >
      <p>Click OK to add remark</p>
      <Form form={form} layout="vertical">
        <Form.Item name="remarks" label="Remark">
          <TextArea placeholder="Enter the remark" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddPlansModal = ({
  remarkModal,
  _closeRemarkModal,
  fetchAll,
  filter,
}) => {
  const [form] = Form.useForm();

  const [plans, setPlan] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const onClose = () => {
    form.setFieldsValue({});
    _closeRemarkModal();
  };

  const fetchPlans = useCallback(async () => {
    const res = await PlanService.list();
    if (res) setPlan(res.data);
  }, []);

  const _addPlans = async () => {
    form
      .validateFields()
      .then((values) => {
        const formdata = new FormData();
        const { plan_id } = values;
        if (!plan_id.length) return;
        plan_id.forEach((id) => {
          formdata.append("plan_id[]", id);
        });
        EnquiryService.addPlan(remarkModal.enquiry_id, formdata).then((res) => {
          if (res) {
            message.success("Plans added successfully");
            fetchAll(filter);
            _closeRemarkModal();
          }
        });
      })
      .catch((err) => message.error(err.message));
  };
  return (
    <Modal visible={remarkModal.show} onOk={_addPlans} onCancel={onClose}>
      <p>Click OK to assign plans</p>
      <Form form={form} layout="vertical">
        <Form.Item name="plan_id" label="Plans">
          <Select
            placeholder="Select plans"
            mode="multiple"
            maxTagTextLength={3}
          >
            {plans?.map((p) => (
              <Option value={p.id} key={p.id}>
                {p?.name ?? p.id}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceList;
